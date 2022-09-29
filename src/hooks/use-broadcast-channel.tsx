import { BroadcastChannel, BroadcastChannelOptions } from 'broadcast-channel';

function useBroadcastChannel<T>(key: string, opts?: BroadcastChannelOptions): BroadcastChannel<T> {
  const channel = new BroadcastChannel<T>(key, opts);

  return channel;
}

export { useBroadcastChannel };
