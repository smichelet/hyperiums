import React from 'react';
import './App.css';
import RenderGrid from './components/RenderGrid';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const App: React.FC = () => {
  return (
    <div>
      <div>
        <p>Blabla</p>
      </div>
      <div className="test">
        <table className="grid">
          <TransformWrapper
            centerOnInit={true}
            initialScale={0.5}
            limitToBounds={false}
            minScale={0.05}
            maxScale={3}
          >
            <TransformComponent>
              <tbody className="tbody">
                <RenderGrid />
              </tbody>
            </TransformComponent>
          </TransformWrapper>
        </table>
      </div>
    </div>
  );
}

export default App;