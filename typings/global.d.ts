interface Window {
  ethereum: import('ethers').providers.ExternalProvider;
}

type VoidFunction = (...args) => void;

// declare global {
//   interface WindowEventMap {
//     'local-storage': CustomEvent;
//   }
// }
