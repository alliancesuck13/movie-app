export default function NetworkState({ onNetworkState }) {
  window.onoffline = () => {
    onNetworkState();
  };

  window.ononline = () => {
    onNetworkState();
  };
}
