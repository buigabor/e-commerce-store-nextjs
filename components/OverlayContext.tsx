import { createContext, useContext, useState } from 'react';

const OverlayStateContext = createContext<boolean>(false);
const UpdateOverlayContext = createContext(() => {});

const OverlayProvider: React.FC = ({ children }) => {
  const [overlayActive, setOverlayActive] = useState<boolean>(false);
  function toggleOverlay() {
    setOverlayActive((prevOverlay) => !prevOverlay);
  }
  return (
    <OverlayStateContext.Provider value={overlayActive}>
      <UpdateOverlayContext.Provider value={toggleOverlay}>
        {children};
      </UpdateOverlayContext.Provider>
    </OverlayStateContext.Provider>
  );
};

export const useOverlay = () => useContext(OverlayStateContext);
export const useUpdateOverlay = () => useContext(UpdateOverlayContext);
export default OverlayProvider;
