import React, { useState } from 'react';
import "../styles/ui.css"
const NodeComparator: React.FC = () => {
  const [node1Data, setNode1Data] = useState({});
  const [node2Data, setNode2Data] = useState({});
  const [node1Text, setNode1Text] = useState('Select node 1 first');
  const [node2Text, setNode2Text] = useState('Select node 1 first');
  const [node1Overflow, setNode1Overflow] = useState('hidden');
  const [node2Overflow, setNode2Overflow] = useState('hidden');
  const [node1Background, setNode1Background] = useState('#C4C4C4');
  const [node2Background, setNode2Background] = useState('#C4C4C4');
  const copyTextToClipboardNode1 = () => {
    const textArea = document.createElement('textarea');
    textArea.value = JSON.stringify(node1Data, null, 1);
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  };

  const copyTextToClipboardNode2 = () => {
    const textArea = document.createElement('textarea');
    textArea.value = JSON.stringify(node2Data, null, 1);
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  };
  const onMessage = (event: MessageEvent) => {
    const { type, node1, node2 } = event.data.pluginMessage;
    setNode1Data(node1);
    setNode2Data(node2);
    if (type === 'comparison-result') {
      setNode1Text(node1 ? JSON.stringify(node1, null, 4) : 'Select node 1 first');
      setNode2Text(node2 ? JSON.stringify(node2, null, 4) : 'Select node 1 first');

      if (node1) {
        setNode1Overflow('scroll');
        setNode1Background('white');
      } else {
        setNode1Overflow('hidden');
        setNode1Background('#C4C4C4');
      }

      if (node2) {
        setNode2Overflow('scroll');
        setNode2Background('white');
      } else {
        setNode2Overflow('hidden');
        setNode2Background('#C4C4C4');
        setNode2Text('Now Select the Node 2');
      }
    }
  };

  window.onmessage = onMessage;

  return (
    <div>
      <div className='container'>
      <h1>Node Comparing Plugin</h1>
      <div className="comparator">
        <div className='node1Container'>
          <p>Node 1</p>
          <div className="node1" style={{ overflow: node1Overflow, backgroundColor: node1Background }}>
          <button className='copyButton' onClick={copyTextToClipboardNode1}>Copy</button>
          <pre
            id="node1"
            className="node-container"
            >
            {node1Text}
          </pre>
        </div>
        </div>
        <div className="node2Container">
          <p>Node 2</p>
        <div className="node2" style={{ overflow: node2Overflow, backgroundColor: node2Background }}>
          <button className='copyButton' onClick={copyTextToClipboardNode2}>Copy</button>
          <pre
            id="node2"
            className="node-container"
            
          >
            {node2Text}
          </pre>
        </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default NodeComparator;