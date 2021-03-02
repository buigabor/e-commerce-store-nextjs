import { createContext, useContext, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/naming-convention
const OverlayStateContext = createContext<boolean>(false);
// eslint-disable-next-line @typescript-eslint/naming-convention
const UpdateOverlayContext = createContext(() => {});

const OverlayProvider: React.FC = ({ children }) => {
  const [overlayActive, setOverlayActive] = useState<boolean>(false);
  function toggleOverlay() {
    setOverlayActive((prevOverlay) => !prevOverlay);
  }
  return (
    <OverlayStateContext.Provider value={overlayActive}>
      <UpdateOverlayContext.Provider value={toggleOverlay}>
        {children}
      </UpdateOverlayContext.Provider>
    </OverlayStateContext.Provider>
  );
};

export const useOverlay = () => useContext(OverlayStateContext);
export const useUpdateOverlay = () => useContext(UpdateOverlayContext);
export default OverlayProvider;
