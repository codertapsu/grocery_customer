import { BroadcastChannel, BroadcastChannelOptions } from 'broadcast-channel';

function useBroadcastChannel<T>(key: string, opts?: BroadcastChannelOptions): BroadcastChannel<T> {
  return new BroadcastChannel<T>(key, opts);
}

export { useBroadcastChannel };
