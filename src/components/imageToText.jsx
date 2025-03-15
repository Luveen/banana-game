import { useState, useEffect } from 'react';
import { createWorker } from 'tesseract.js';
import ImagePreprocessor from './ImagePreprocessor';


const ImageToText = ({ imageUrl }) => {
  const [text, setText] = useState('INITIAL STATE');
  const [processedImage, setProcessedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Debug output
  console.log('Current state:', { imageUrl, processedImage, loading, error });

  useEffect(() => {
    console.log('Image URL changed:', imageUrl);
    setProcessedImage(null);
    setLoading(true);
  }, [imageUrl]);

  useEffect(() => {
    const convertImageToText = async () => {
      if (!processedImage) {
        console.log('No processed image available');
        return;
      }

      console.log('Starting OCR processing...');
      const worker = await createWorker();
      
      try {
        console.log('Worker created, initializing...');
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        
        await worker.setParameters({
          tessedit_char_whitelist: '0123456789+-×÷=xX',
          tessedit_pageseg_mode: '6',
          preserve_interword_spaces: '1'
        });

        console.log('Recognizing image:', processedImage);
        const { data } = await worker.recognize(processedImage);
        console.log('OCR raw output:', data);

        const formattedText = data.text
          .replace(/(\d)\s+(\d)/g, '$1$2')
          .replace(/([+-×x=])\s+/g, '$1 ')
          .split('\n')
          .filter(line => line.trim().length > 0)
          .join('\n');

        console.log('Formatted text:', formattedText);
        setText(formattedText);
        setError(null);
      } catch (err) {
        console.error('OCR Error:', err);
        setError(err.message);
        setText('OCR Error: ' + err.message);
      } finally {
        console.log('Terminating worker');
        await worker.terminate();
        setLoading(false);
      }
    };

    convertImageToText();
  }, [processedImage]);

  return (
    <div className="mt-3 debug-border">
      <h4>OCR Debug Information</h4>
      
      <div className="mb-3">
        <strong>Image URL:</strong> 
        <div className="text-truncate">{imageUrl || 'No image URL provided'}</div>
      </div>

      <ImagePreprocessor 
        src={imageUrl} 
        onProcess={(url) => {
          console.log('Received processed image:', url);
          setProcessedImage(url);
        }}
      />

      <div className="ocr-results bg-light p-3 rounded">
        {loading ? (
          <div className="text-info">
            <span className="spinner-border spinner-border-sm me-2"></span>
            Processing image...
          </div>
        ) : error ? (
          <div className="text-danger">Error: {error}</div>
        ) : (
          <pre className="mb-0">{text}</pre>
        )}
      </div>
    </div>
  );
};

export default ImageToText;


// // import { useState, useEffect } from 'react';
// // import { createWorker } from 'tesseract.js';
// // import ImagePreprocessor from './ImagePreprocessor';

// // const ImageToText = ({ imageUrl }) => {
// //   const [text, setText] = useState('');
// //   const [processedImage, setProcessedImage] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     let worker;
// //     const timeoutDuration = 10000; // 10-second timeout

// //     const processOCR = async () => {
// //       try {
// //         setLoading(true);
// //         worker = await createWorker();
        
// //         await worker.loadLanguage('eng');
// //         await worker.initialize('eng');
        
// //         // Set OCR parameters for math equations
// //         await worker.setParameters({
// //           tessedit_char_whitelist: '0123456789+-×÷=xX',
// //           tessedit_pageseg_mode: '6',
// //           preserve_interword_spaces: '1'
// //         });

// //         // Add timeout handling
// //         const timeoutPromise = new Promise((_, reject) => 
// //           setTimeout(() => reject(new Error('OCR timeout')), timeoutDuration)
// //         );

// //         const { data: { text } } = await Promise.race([
// //           worker.recognize(processedImage),
// //           timeoutPromise
// //         ]);

// //         // Post-processing
// //         const formatted = text
// //           .replace(/[\s]/g, '') // Remove all whitespace
// //           .replace(/(\D)(\d)/g, '$1 $2') // Add space between operator and number
// //           .replace(/(\d)(\D)/g, '$1 $2'); // Add space between number and operator

// //         setText(formatted);
// //         setError(null);
// //       } catch (err) {
// //         console.error('OCR Error:', err);
// //         setError(err.message);
// //         setText('Failed to process image');
// //       } finally {
// //         if (worker) await worker.terminate();
// //         setLoading(false);
// //       }
// //     };

// //     if (processedImage) processOCR();
// //   }, [processedImage]);

// //   return (
// //     <div className="ocr-container">
// //       <ImagePreprocessor 
// //         src={imageUrl}
// //         onProcess={setProcessedImage}
// //       />
      
// //       {loading ? (
// //         <div className="loading-status">
// //           <div className="spinner"></div>
// //           <p>Analyzing equations...</p>
// //         </div>
// //       ) : (
// //         <div className="ocr-results">
// //           {error ? (
// //             <div className="error-message">
// //               Error: {error} - <button onClick={() => setProcessedImage(null)}>Retry</button>
// //             </div>
// //           ) : (
// //             <pre>{text}</pre>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../App.css';

// import { useState, useEffect } from 'react';
// import { createWorker } from 'tesseract.js';
// import PropTypes from 'prop-types';

// const ImageToText = ({ imageUrl, retryCount = 0 }) => {
//   const [ocrText, setOcrText] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     let worker;
//     let retries = 0;
//     const maxRetries = 3;

//     const processImage = async () => {
//       try {
//         setLoading(true);
//         setError(null);
        
//         worker = await createWorker({
//           logger: message => {
//             if (message.status === 'recognizing text') {
//               setProgress(Math.round(message.progress * 100));
//             }
//           }
//         });

//         await worker.loadLanguage('eng');
//         await worker.initialize('eng');
        
//         // Optimize for mathematical equations
//         await worker.setParameters({
//           tessedit_char_whitelist: '0123456789+-×÷=?!xX',
//           tessedit_pageseg_mode: '6', // Sparse text with OSD
//           preserve_interword_spaces: '1',
//           tessjs_create_hocr: '0'
//         });

//         const { data: { text } } = await worker.recognize(imageUrl);
        
//         // Post-process OCR results
//         const cleanedText = text
//           .replace(/\s/g, '') // Remove whitespace
//           .replace(/(\d)([+\-×x=])(\d)/g, '$1 $2 $3') // Add spaces around operators
//           .replace(/([+\-×x=])(\d)/g, '$1 $2')
//           .replace(/(\d)([+\-×x=])/g, '$1 $2');

//         setOcrText(cleanedText);
//         retries = 0;
//       } catch (err) {
//         if (retries < maxRetries) {
//           retries++;
//           console.warn(`Retrying... (${retries}/${maxRetries})`);
//           await new Promise(resolve => setTimeout(resolve, 1000));
//           return processImage();
//         }
//         setError(`OCR Failed: ${err.message}`);
//       } finally {
//         if (worker) await worker.terminate();
//         setLoading(false);
//       }
//     };

//     if (imageUrl) {
//       processImage();
//     }

//     return () => {
//       if (worker) {
//         worker.terminate();
//       }
//     };
//   }, [imageUrl, retryCount]);

//   if (!imageUrl) {
//     return (
//       <div className="alert alert-warning">
//         No image provided for OCR processing
//       </div>
//     );
//   }

//   return (
//     <div className="ocr-container p-3 border rounded">
//       <div className="image-preview mb-3">
//         <img
//           src={imageUrl}
//           alt="OCR Source"
//           className="img-fluid"
//           crossOrigin="anonymous"
//           onError={() => setError('Failed to load image')}
//         />
//       </div>

//       {loading ? (
//         <div className="loading-state text-center">
//           <div className="spinner-border text-primary" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//           <div className="mt-2">
//             Processing... {progress}%
//             <div className="progress mt-1">
//               <div
//                 className="progress-bar"
//                 role="progressbar"
//                 style={{ width: `${progress}%` }}
//               />
//             </div>
//           </div>
//         </div>
//       ) : error ? (
//         <div className="error-state alert alert-danger">
//           {error}
//           <button
//             className="btn btn-sm btn-outline-danger ms-3"
//             onClick={() => window.location.reload()}
//           >
//             Retry
//           </button>
//         </div>
//       ) : (
//         <div className="ocr-results">
//           <h5 className="mb-3">Extracted Text:</h5>
//           <pre className="bg-light p-3 rounded">
//             {ocrText || 'No text detected'}
//           </pre>
//         </div>
//       )}
//     </div>
//   );
// };

// ImageToText.propTypes = {
//   imageUrl: PropTypes.string.isRequired,
//   retryCount: PropTypes.number
// };

// export default ImageToText;