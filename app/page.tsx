"use client";

import {
  Activity,
  Cable,
  CircleOff,
  Loader2,
  Radio,
  SlidersHorizontal,
  Unplug,
  VolumeX,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  type Connector,
  useAccount,
  useConnect,
  useDisconnect,
  useReadContracts,
  useWriteContract,
} from "wagmi";
import { waitForTransactionReceipt } from "wagmi/actions";
import { base } from "viem/chains";
import { studioSwitchAbi } from "@/lib/abi";
import { attributionDataSuffix, contractAddress, wagmiConfig } from "@/lib/wagmi";

type ActionKey = "cue" | "roll" | "mute";
type TxStatus = "Idle" | "Pending" | "Confirmed" | "Failed" | "Request rejected";

const emptyAddress = "0x0000000000000000000000000000000000000000" as const;

const actionConfig: Record<
  ActionKey,
  {
    label: string;
    verb: string;
    functionName: "cueLight" | "rollTape" | "muteTrack";
    icon: typeof Zap;
    tone: string;
  }
> = {
  cue: {
    label: "Cue Light",
    verb: "Armed light cue",
    functionName: "cueLight",
    icon: Zap,
    tone: "from-[#ff3b3b] to-[#ffb000]",
  },
  roll: {
    label: "Roll Tape",
    verb: "Started tape roll",
    functionName: "rollTape",
    icon: Radio,
    tone: "from-[#0052ff] to-[#35d07f]",
  },
  mute: {
    label: "Mute Track",
    verb: "Muted program track",
    functionName: "muteTrack",
    icon: VolumeX,
    tone: "from-[#2ce879] to-[#c8ff4d]",
  },
};

function shortAddress(address?: string) {
  if (!address) return "Not connected";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function formatCount(value: unknown) {
  return typeof value === "bigint" ? value.toString() : "0";
}

function safeConnectorName(connector: Connector) {
  if (connector.id === "injected") return "Injected Wallet";
  return connector.name || "Wallet";
}

export default function Home() {
  const { address, isConnected, chainId } = useAccount();
  const { connectors, connectAsync, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  const { writeContractAsync } = useWriteContract();
  const [walletMenuOpen, setWalletMenuOpen] = useState(false);
  const [lastHash, setLastHash] = useState<`0x${string}` | undefined>();
  const [lastAction, setLastAction] = useState<ActionKey | undefined>();
  const [txStatus, setTxStatus] = useState<TxStatus>("Idle");
  const [friendlyNotice, setFriendlyNotice] = useState("Ready for a studio action.");

  const reads = useMemo(
    () => [
      {
        address: contractAddress,
        abi: studioSwitchAbi,
        functionName: "userCues",
        args: [address ?? emptyAddress],
        chainId: base.id,
      },
      {
        address: contractAddress,
        abi: studioSwitchAbi,
        functionName: "userRolls",
        args: [address ?? emptyAddress],
        chainId: base.id,
      },
      {
        address: contractAddress,
        abi: studioSwitchAbi,
        functionName: "userMutes",
        args: [address ?? emptyAddress],
        chainId: base.id,
      },
      {
        address: contractAddress,
        abi: studioSwitchAbi,
        functionName: "totalCues",
        chainId: base.id,
      },
      {
        address: contractAddress,
        abi: studioSwitchAbi,
        functionName: "totalRolls",
        chainId: base.id,
      },
      {
        address: contractAddress,
        abi: studioSwitchAbi,
        functionName: "totalMutes",
        chainId: base.id,
      },
    ],
    [address],
  );

  const { data, refetch, isLoading: countersLoading } = useReadContracts({
    contracts: reads,
    query: {
      enabled: contractAddress !== emptyAddress,
      refetchInterval: 12_000,
    },
  });

  const counters = {
    myCues: formatCount(data?.[0]?.result),
    myRolls: formatCount(data?.[1]?.result),
    myMutes: formatCount(data?.[2]?.result),
    totalCues: formatCount(data?.[3]?.result),
    totalRolls: formatCount(data?.[4]?.result),
    totalMutes: formatCount(data?.[5]?.result),
  };

  async function connectWallet(connector: Connector) {
    try {
      await connectAsync({ connector, chainId: base.id });
      setWalletMenuOpen(false);
      setFriendlyNotice("Wallet connected.");
      setTxStatus("Idle");
    } catch (error) {
      console.error(error);
      setFriendlyNotice("Connection was not completed.");
      setTxStatus("Request rejected");
    }
  }

  async function runAction(action: ActionKey) {
    if (!isConnected) {
      setWalletMenuOpen(true);
      setFriendlyNotice("Connect a wallet to send this action.");
      return;
    }

    if (contractAddress === emptyAddress) {
      setFriendlyNotice("Contract is not configured yet.");
      setTxStatus("Failed");
      return;
    }

    try {
      setLastAction(action);
      setTxStatus("Pending");
      setFriendlyNotice(`${actionConfig[action].label} is waiting for confirmation.`);

      const hash = await writeContractAsync({
        address: contractAddress,
        abi: studioSwitchAbi,
        functionName: actionConfig[action].functionName,
        chainId: base.id,
        dataSuffix: attributionDataSuffix,
      });

      setLastHash(hash);
      setFriendlyNotice("Transaction sent. Waiting for confirmation.");
      await waitForTransactionReceipt(wagmiConfig, {
        hash,
        chainId: base.id,
      });
      setTxStatus("Confirmed");
      setFriendlyNotice("Confirmed.");
      await refetch();
    } catch (error) {
      console.error(error);
      const message = error instanceof Error ? error.message.toLowerCase() : "";
      setTxStatus(message.includes("reject") ? "Request rejected" : "Failed");
      setFriendlyNotice(
        message.includes("reject")
          ? "Request rejected."
          : "Transaction failed. Please try again.",
      );
    }
  }

  const walletState = isConnected
    ? chainId === base.id
      ? "Connected on Base"
      : "Switch to Base"
    : "Disconnected";

  return (
    <main className="min-h-screen overflow-hidden bg-[#050607] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="grid size-12 place-items-center rounded-md border border-[#0052ff]/50 bg-[#08183d] shadow-[0_0_28px_rgba(0,82,255,0.28)]">
              <SlidersHorizontal className="size-6 text-[#7eb0ff]" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-normal text-white">
                Studio Switch
              </h1>
              <p className="text-xs uppercase tracking-[0.2em] text-white/45">
                Base production console
              </p>
            </div>
          </div>

          <div className="relative flex items-center gap-2">
            <span
              className={`size-2.5 rounded-full ${
                isConnected ? "bg-[#35d07f]" : "bg-[#ff3b3b]"
              } shadow-[0_0_18px_currentColor]`}
            />
            <div className="min-w-0 text-right text-xs">
              <p className="font-medium text-white">{walletState}</p>
              <p className="font-mono text-white/50">{shortAddress(address)}</p>
            </div>
            <button
              type="button"
              onClick={() =>
                isConnected ? disconnect() : setWalletMenuOpen((open) => !open)
              }
              className="inline-flex h-11 items-center gap-2 rounded-md border border-white/15 bg-white/8 px-3 text-sm font-medium text-white transition hover:border-[#0052ff]/70 hover:bg-[#0052ff]/20"
            >
              {isConnected ? <Unplug className="size-4" /> : <Cable className="size-4" />}
              {isConnected ? "Disconnect" : "Connect"}
            </button>

            {walletMenuOpen && !isConnected ? (
              <div className="absolute right-0 top-14 z-20 w-64 rounded-md border border-white/12 bg-[#101214] p-2 shadow-2xl">
                <p className="px-2 pb-2 text-xs uppercase tracking-[0.16em] text-white/45">
                  Select wallet
                </p>
                {connectors.map((connector) => (
                  <button
                    type="button"
                    key={connector.uid}
                    disabled={isConnecting}
                    onClick={() => connectWallet(connector)}
                    className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm text-white transition hover:bg-white/10 disabled:cursor-wait disabled:opacity-60"
                  >
                    {safeConnectorName(connector)}
                    {isConnecting ? <Loader2 className="size-4 animate-spin" /> : null}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </header>

        <section className="grid flex-1 gap-4 py-4 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="relative overflow-hidden rounded-md border border-white/10 bg-[#0c0d0f] p-4 shadow-2xl">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#ff3b3b] via-[#35d07f] to-[#0052ff]" />
            <div className="grid gap-4 md:grid-cols-[1fr_160px]">
              <div className="rounded-md border border-white/10 bg-[#151719] p-4">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/45">
                    Program bus
                  </p>
                  <Activity className="size-4 text-[#35d07f]" />
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {(Object.keys(actionConfig) as ActionKey[]).map((key) => {
                    const action = actionConfig[key];
                    const Icon = action.icon;
                    const active = lastAction === key && txStatus === "Pending";
                    return (
                      <button
                        type="button"
                        key={key}
                        onClick={() => runAction(key)}
                        disabled={txStatus === "Pending"}
                        className="group min-h-36 rounded-md border border-white/12 bg-[#090a0c] p-3 text-left transition hover:-translate-y-0.5 hover:border-white/35 disabled:cursor-wait disabled:opacity-70"
                      >
                        <div
                          className={`mb-4 grid size-11 place-items-center rounded-md bg-gradient-to-br ${action.tone} text-black shadow-[0_0_26px_rgba(255,255,255,0.18)]`}
                        >
                          {active ? (
                            <Loader2 className="size-5 animate-spin" />
                          ) : (
                            <Icon className="size-5" />
                          )}
                        </div>
                        <p className="text-lg font-semibold text-white">{action.label}</p>
                        <p className="mt-2 text-sm leading-5 text-white/48">
                          {action.verb}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-5 gap-2 rounded-md border border-white/10 bg-[#111315] p-3 md:grid-cols-1">
                {Array.from({ length: 10 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-8 rounded-sm border border-black/40 bg-[#1d2023] p-1 md:h-auto md:min-h-5"
                  >
                    <div
                      className={`h-full rounded-[2px] ${
                        index < 3
                          ? "bg-[#35d07f]"
                          : index < 7
                            ? "bg-[#c8ff4d]"
                            : "bg-[#ff3b3b]"
                      } ${index % 2 ? "opacity-60" : "opacity-100"}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                ["My Cues", counters.myCues, "Total Cues", counters.totalCues],
                ["My Rolls", counters.myRolls, "Total Rolls", counters.totalRolls],
                ["My Mutes", counters.myMutes, "Total Mutes", counters.totalMutes],
              ].map(([mineLabel, mine, totalLabel, total]) => (
                <div
                  key={mineLabel}
                  className="rounded-md border border-white/10 bg-[#111315] p-4"
                >
                  <p className="text-xs uppercase tracking-[0.16em] text-white/45">
                    {mineLabel}
                  </p>
                  <p className="mt-2 font-mono text-3xl font-semibold text-white">
                    {countersLoading ? "..." : mine}
                  </p>
                  <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3 text-sm">
                    <span className="text-white/45">{totalLabel}</span>
                    <span className="font-mono text-[#35d07f]">
                      {countersLoading ? "..." : total}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="grid content-start gap-4">
            <div className="rounded-md border border-white/10 bg-[#101214] p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-white/45">
                Monitor
              </p>
              <div className="mt-4 grid gap-3">
                <StatusRow label="Wallet Status" value={walletState} />
                <StatusRow label="Last Transaction" value={txStatus} />
                <StatusRow
                  label="Transaction Hash"
                  value={lastHash ? shortAddress(lastHash) : "None"}
                />
              </div>
            </div>

            <div className="rounded-md border border-white/10 bg-[#101214] p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.2em] text-white/45">
                  Recent Activity
                </p>
                {txStatus === "Pending" ? (
                  <Loader2 className="size-4 animate-spin text-[#0052ff]" />
                ) : (
                  <CircleOff className="size-4 text-white/35" />
                )}
              </div>
              <p className="mt-4 rounded-md border border-white/10 bg-black/30 p-3 text-sm leading-6 text-white/72">
                {friendlyNotice}
              </p>
            </div>

            <div className="rounded-md border border-white/10 bg-[#101214] p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-white/45">
                Fader Rails
              </p>
              <div className="mt-5 grid gap-5">
                {[72, 48, 86].map((height, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="h-2 flex-1 rounded-full bg-[#25292e]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#0052ff] via-[#35d07f] to-[#ff3b3b]"
                        style={{ width: `${height}%` }}
                      />
                    </div>
                    <span className="w-10 text-right font-mono text-xs text-white/45">
                      {height}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}

function StatusRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-md border border-white/10 bg-black/20 px-3 py-2">
      <span className="text-sm text-white/50">{label}</span>
      <span className="min-w-0 truncate text-right text-sm font-medium text-white">
        {value}
      </span>
    </div>
  );
}
