import { useEffect, useRef } from 'react';

const ImagePreprocessor = ({ src, onProcess }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const processImage = async () => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = src;
      
      img.onload = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        // Set canvas dimensions
        canvas.width = img.width * 2;
        canvas.height = img.height * 2;
        
        // Preprocessing steps
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.imageSmoothingEnabled = false;
        
        // Convert to grayscale and enhance contrast
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i] = avg < 128 ? 0 : 255; // Thresholding
          data[i + 1] = avg < 128 ? 0 : 255;
          data[i + 2] = avg < 128 ? 0 : 255;
        }
        
        ctx.putImageData(imageData, 0, 0);
        onProcess(canvas.toDataURL());
      };
    };

    processImage();
  }, [src, onProcess]);

  return <canvas ref={canvasRef} style={{ display: 'none' }} />;
};

export default ImagePreprocessor;


// import { useEffect, useRef } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../App.css';

// const ImagePreprocessor = ({ src, onProcess }) => {
//   const canvasRef = useRef(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const processImage = async () => {
//       try {
//         const img = new Image();
//         img.crossOrigin = "Anonymous";
//         img.src = src;
        
//         img.onerror = () => {
//           throw new Error('Failed to load image');
//         };

//         img.onload = () => {
//           const canvas = canvasRef.current;
//           if (!canvas) return;
          
//           const ctx = canvas.getContext('2d');
//           canvas.width = img.width * 2;
//           canvas.height = img.height * 2;

//           // Draw original image
//           ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          
//           // Apply preprocessing
//           const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//           const data = imageData.data;
          
//           // Contrast enhancement
//           for (let i = 0; i < data.length; i += 4) {
//             const avg = (data[i] + data[i+1] + data[i+2]) / 3;
//             const threshold = avg < 128 ? 0 : 255;
//             data[i] = data[i+1] = data[i+2] = threshold;
//           }
          
//           ctx.putImageData(imageData, 0, 0);
//           onProcess(canvas.toDataURL());
//         };
//       } catch (err) {
//         console.error('Preprocessing error:', err);
//         onProcess(null);
//         setError(err.message);
//       }
//     };

//     const timer = setTimeout(() => {
//       processImage();
//     }, 500); // Start processing after image load

//     return () => clearTimeout(timer);
//   }, [src, onProcess]);

//   return <canvas ref={canvasRef} style={{ display: 'none' }} />;
// };