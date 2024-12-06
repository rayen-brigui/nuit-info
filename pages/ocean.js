import ThreeCanvas from '../components/ThreeCanvas';

const OceanPage = () => {
  return (
    <div>
      <h1 style={{ position: 'absolute', zIndex: 1, color: 'white', padding: '10px' }}>
        Human-Ocean Parallels
      </h1>
      <ThreeCanvas />
    </div>
  );
};

export default OceanPage;
