import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { scanAPI } from '../services/api';
import { Camera, Image as ImageIcon, Barcode, UploadCloud, ScanLine, X, Loader2, VideoOff, ZapOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserMultiFormatReader } from '@zxing/browser';

const ScanProduct = () => {
  const [scanType, setScanType] = useState('image'); // 'image' or 'barcode'
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [barcode, setBarcode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Camera scanner state
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [detected, setDetected] = useState(false);

  const videoRef = useRef(null);
  const codeReaderRef = useRef(null);
  const controlsRef = useRef(null);
  const navigate = useNavigate();

  // Cleanup on unmount or tab switch
  useEffect(() => {
    return () => stopCamera();
  }, []);

  useEffect(() => {
    if (scanType !== 'barcode') stopCamera();
  }, [scanType]);

  const stopCamera = () => {
    if (controlsRef.current) {
      try { controlsRef.current.stop(); } catch (_) {}
      controlsRef.current = null;
    }
    setIsCameraOpen(false);
    setIsScanning(false);
    setDetected(false);
    setCameraError('');
  };

  const startCamera = useCallback(async () => {
    setCameraError('');
    setDetected(false);
    setIsCameraOpen(true);
    setIsScanning(true);

    // Small delay to let the video element render
    await new Promise(r => setTimeout(r, 150));

    try {
      const reader = new BrowserMultiFormatReader();
      codeReaderRef.current = reader;

      const controls = await reader.decodeFromVideoDevice(
        undefined, // use default camera
        videoRef.current,
        (result, err, ctrl) => {
          if (result) {
            const scannedCode = result.getText();
            setDetected(true);
            setBarcode(scannedCode);
            // Stop camera then auto-submit
            ctrl.stop();
            controlsRef.current = null;
            setIsCameraOpen(false);
            setIsScanning(false);
            // Small delay for UX feedback before submit
            setTimeout(() => {
              handleAutoSubmit(scannedCode);
            }, 300);
          }
          // NotFoundException is normal — means no barcode in current frame
        }
      );
      controlsRef.current = controls;
    } catch (err) {
      console.error('Camera error:', err);
      setCameraError(
        err.name === 'NotAllowedError'
          ? 'Camera permission denied. Allow camera access and retry.'
          : err.name === 'NotFoundError'
          ? 'No camera device found on this device.'
          : 'Failed to initialize camera. Please try again.'
      );
      setIsCameraOpen(false);
      setIsScanning(false);
    }
  }, []);

  const handleAutoSubmit = async (code) => {
    setLoading(true);
    setError('');
    try {
      const response = await scanAPI.scanBarcode(code);
      const scanData = {
        score: response.product.safetyScore,
        hiddenSugars: response.product.hiddenSugars,
        additives: response.product.additives,
        warnings: response.product.warnings,
      };
      navigate(`/results/${response.scanId}`, { state: { data: response.product, scanData } });
    } catch (err) {
      setError(err.response?.data?.message || 'Barcode disconnected from open matrix.');
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selected);
    }
  };

  const handleImageScan = async (e) => {
    e.preventDefault();
    if (!file) return setError('Upload an image to scan.');
    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('image', file);
      const response = await scanAPI.scanImage(formData);
      const scanData = {
        score: response.product.safetyScore,
        hiddenSugars: response.product.hiddenSugars,
        additives: response.product.additives,
        warnings: response.product.warnings,
      };
      navigate(`/results/${response.scanId}`, { state: { data: response.product, scanData } });
    } catch (err) {
      setError(err.response?.data?.message || 'Error parsing neural image data');
      setLoading(false);
    }
  };

  const handleBarcodeScan = async (e) => {
    e.preventDefault();
    if (!barcode) return setError('Enter a valid neural barcode index.');
    setLoading(true);
    setError('');
    try {
      const response = await scanAPI.scanBarcode(barcode);
      const scanData = {
        score: response.product.safetyScore,
        hiddenSugars: response.product.hiddenSugars,
        additives: response.product.additives,
        warnings: response.product.warnings,
      };
      navigate(`/results/${response.scanId}`, { state: { data: response.product, scanData } });
    } catch (err) {
      setError(err.response?.data?.message || 'Barcode disconnected from open matrix.');
      setLoading(false);
    }
  };

  const panelVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 min-h-[calc(100vh-8rem)] flex flex-col items-center">

      <div className="text-center mb-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="inline-flex items-center space-x-2 bg-tech/10 border border-tech/30 rounded-full px-4 py-2 mb-4">
          <ScanLine className="w-4 h-4 text-tech glow-text-tech animate-pulse" />
          <span className="text-xs font-mono font-medium text-tech glow-text-tech uppercase tracking-wider">Acquisition Array</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white font-display mb-4">
          Scan Organic Matter
        </h1>
        <p className="text-gray-400 font-mono text-sm max-w-xl mx-auto">
          Upload a visual node of an ingredient list or input a standard planetary barcode to initiate deep neural analysis.
        </p>
      </div>

      <div className="w-full glass-panel-hover glass-panel rounded-3xl p-2 mb-8 flex relative z-10 transition-all">
        <div className="absolute inset-0 bg-gradient-to-r from-tech/5 to-safe/5 rounded-3xl z-0 pointer-events-none"></div>
        <button
          onClick={() => setScanType('image')}
          className={`flex-1 flex flex-col items-center justify-center py-4 rounded-2xl relative z-10 transition-all ${
            scanType === 'image'
              ? 'bg-tech/20 text-white shadow-[0_0_15px_rgba(57,255,20,0.2)] border border-tech/30'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Camera className={`w-6 h-6 mb-2 ${scanType === 'image' ? 'text-tech glow-text-tech' : ''}`} />
          <span className="font-mono uppercase tracking-widest text-xs font-bold">Visual OCR Input</span>
        </button>
        <button
          onClick={() => setScanType('barcode')}
          className={`flex-1 flex flex-col items-center justify-center py-4 rounded-2xl relative z-10 transition-all ${
            scanType === 'barcode'
              ? 'bg-tech/20 text-white shadow-[0_0_15px_rgba(57,255,20,0.2)] border border-tech/30'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Barcode className={`w-6 h-6 mb-2 ${scanType === 'barcode' ? 'text-tech glow-text-tech' : ''}`} />
          <span className="font-mono uppercase tracking-widest text-xs font-bold">Standard Barcode</span>
        </button>
      </div>

      {error && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="w-full bg-danger/10 border-l-4 border-danger p-4 rounded-xl mb-6 flex items-center shadow-[0_0_10px_rgba(255,59,59,0.2)]">
          <span className="text-danger glow-text-danger font-mono text-sm uppercase font-bold mr-2">Error:</span>
          <span className="text-danger/80 text-sm font-mono">{error}</span>
        </motion.div>
      )}

      <div className="w-full relative">
        <AnimatePresence mode="wait">

          {/* ── IMAGE SCAN TAB ── */}
          {scanType === 'image' && (
            <motion.div
              key="image-scan"
              variants={panelVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="w-full glass-panel rounded-3xl p-8"
            >
              <form onSubmit={handleImageScan} className="flex flex-col h-full">
                <div
                  className={`relative border-2 border-dashed ${preview ? 'border-tech/50 bg-tech/5' : 'border-gray-600 bg-space-900/50 hover:border-tech/30 hover:bg-tech/5'} rounded-2xl p-8 flex flex-col items-center justify-center transition-all min-h-[300px] overflow-hidden group cursor-pointer`}
                  onClick={() => !preview && document.getElementById('file-upload').click()}
                >
                  {preview ? (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <img src={preview} alt="Upload preview" className="max-h-[300px] rounded-xl object-contain z-10 relative" />
                      {loading && (
                        <div className="absolute inset-0 z-20 overflow-hidden rounded-xl border-2 border-tech">
                          <div className="absolute inset-0 bg-tech/20 animate-pulse"></div>
                          <motion.div
                            animate={{ y: ['0%', '100%', '0%'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                            className="absolute top-0 w-full h-8 bg-gradient-to-b from-transparent via-tech/50 to-tech border-b-2 border-tech shadow-[0_0_20px_#39FF14]"
                          />
                          <div className="absolute inset-0 flex items-center justify-center mix-blend-overlay opacity-30">
                            <div className="w-full h-full border border-tech/30 grid grid-cols-4 grid-rows-4">
                              {[...Array(16)].map((_, i) => <div key={i} className="border border-tech/10"></div>)}
                            </div>
                          </div>
                        </div>
                      )}
                      {!loading && (
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setFile(null); setPreview(null); }}
                          className="absolute -top-3 -right-3 bg-danger text-white p-2 rounded-full hover:bg-rose-600 z-30 shadow-lg border-2 border-space-900"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-full bg-space-800 flex items-center justify-center mx-auto mb-4 border border-white/5 group-hover:scale-110 group-hover:border-tech/30 transition-all shadow-inner">
                        <UploadCloud className="w-10 h-10 text-gray-400 group-hover:text-tech transition-colors" />
                      </div>
                      <p className="font-mono text-gray-300 text-sm mb-1">Click to upload neural visual scan</p>
                      <p className="text-xs text-gray-500 font-mono uppercase tracking-widest">PNG, JPG, JPEG (Max 5MB)</p>
                    </div>
                  )}
                  <input id="file-upload" type="file" className="hidden" accept="image/jpeg, image/png, image/jpg" onChange={handleFileChange} disabled={loading} />
                </div>
                <div className="mt-8 flex justify-end">
                  <button type="submit" disabled={!file || loading} className={`btn-primary w-full md:w-auto px-10 ${!file || loading ? 'opacity-50 cursor-not-allowed hover:bg-tech/10' : ''}`}>
                    {loading ? (
                      <span className="flex items-center"><Loader2 className="w-5 h-5 mr-2 animate-spin" /> EXECUTING NEURAL SCAN...</span>
                    ) : (
                      <span className="flex items-center">INITIATE ANALYSIS <ScanLine className="w-5 h-5 ml-2" /></span>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* ── BARCODE SCAN TAB ── */}
          {scanType === 'barcode' && (
            <motion.div
              key="barcode-scan"
              variants={panelVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="w-full glass-panel rounded-3xl p-8"
            >
              <form onSubmit={handleBarcodeScan} className="flex flex-col h-full">
                <div className="border-2 border-dashed border-gray-600 bg-space-900/50 p-8 rounded-2xl transition-all focus-within:border-tech/50 focus-within:bg-tech/5 min-h-[300px] justify-center flex flex-col">
                  <div className="max-w-md mx-auto w-full text-center">

                    {/* ── CAMERA VIEWPORT ── */}
                    <AnimatePresence>
                      {isCameraOpen && (
                        <motion.div
                          initial={{ opacity: 0, scaleY: 0.8 }}
                          animate={{ opacity: 1, scaleY: 1 }}
                          exit={{ opacity: 0, scaleY: 0.8 }}
                          transition={{ duration: 0.3 }}
                          className="mb-6 relative overflow-hidden rounded-2xl border-2 border-tech shadow-[0_0_30px_rgba(57,255,20,0.3)] bg-black"
                          style={{ aspectRatio: '4/3' }}
                        >
                          {/* Live video feed */}
                          <video
                            ref={videoRef}
                            className="w-full h-full object-cover"
                            autoPlay
                            playsInline
                            muted
                          />

                          {/* Scanning HUD overlay */}
                          <div className="absolute inset-0 pointer-events-none">
                            {/* Animated sweep line */}
                            <motion.div
                              animate={{ y: ['0%', '100%', '0%'] }}
                              transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                              className="absolute top-0 left-0 w-full h-1 bg-gradient-to-b from-tech via-tech/80 to-transparent shadow-[0_0_12px_#39FF14]"
                            />

                            {/* Corner brackets */}
                            <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-tech rounded-tl" />
                            <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-tech rounded-tr" />
                            <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-tech rounded-bl" />
                            <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-tech rounded-br" />

                            {/* Center target box */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-2/3 h-12 border border-tech/40 rounded bg-tech/5 flex items-center justify-center">
                                <span className="text-tech/60 font-mono text-[10px] uppercase tracking-widest">ALIGN BARCODE</span>
                              </div>
                            </div>

                            {/* Status pill */}
                            <div className="absolute top-3 left-1/2 -translate-x-1/2">
                              <div className="flex items-center gap-1.5 bg-black/60 border border-tech/30 rounded-full px-3 py-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-tech animate-pulse" />
                                <span className="text-tech font-mono text-[10px] uppercase tracking-widest">
                                  {detected ? 'DETECTED' : 'SCANNING'}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Close camera button */}
                          <button
                            type="button"
                            onClick={stopCamera}
                            className="absolute top-2 right-2 bg-danger/80 hover:bg-danger text-white p-1.5 rounded-full z-30 transition-all border border-danger/50 shadow-lg"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Camera error */}
                    {cameraError && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mb-4 bg-danger/10 border border-danger/30 rounded-xl p-3 flex items-center gap-2"
                      >
                        <ZapOff className="w-4 h-4 text-danger flex-shrink-0" />
                        <span className="text-danger/80 text-xs font-mono text-left">{cameraError}</span>
                      </motion.div>
                    )}

                    {/* Icon — hide when camera open */}
                    {!isCameraOpen && (
                      <div className="w-20 h-20 rounded-full bg-space-800 flex items-center justify-center mx-auto mb-8 border border-white/5 shadow-inner">
                        <Barcode className="w-10 h-10 text-gray-400" />
                      </div>
                    )}

                    <label htmlFor="barcode" className="block text-sm font-mono text-gray-400 tracking-widest uppercase mb-4 text-center">
                      Enter Universal Product Code (UPC/EAN)
                    </label>

                    <input
                      id="barcode"
                      type="text"
                      required
                      value={barcode}
                      onChange={(e) => setBarcode(e.target.value.replace(/\D/g, ''))}
                      className="input-field text-center text-2xl tracking-[0.2em] font-mono mb-4 py-4 h-16"
                      placeholder="0000000000"
                      disabled={loading}
                    />

                    {/* Scan via Camera button */}
                    {!isCameraOpen && (
                      <button
                        type="button"
                        onClick={startCamera}
                        disabled={loading}
                        className="w-full mb-4 flex items-center justify-center gap-2 rounded-xl border border-tech/40 bg-tech/5 hover:bg-tech/15 hover:border-tech/70 hover:shadow-[0_0_18px_rgba(57,255,20,0.3)] text-tech font-mono text-sm font-semibold py-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Camera className="w-4 h-4" />
                        SCAN VIA CAMERA
                      </button>
                    )}

                    {isCameraOpen && (
                      <button
                        type="button"
                        onClick={stopCamera}
                        className="w-full mb-4 flex items-center justify-center gap-2 rounded-xl border border-danger/40 bg-danger/5 hover:bg-danger/15 text-danger font-mono text-sm font-semibold py-3 transition-all duration-300"
                      >
                        <VideoOff className="w-4 h-4" />
                        STOP CAMERA
                      </button>
                    )}

                    <button
                      type="submit"
                      disabled={!barcode || loading}
                      className={`btn-primary w-full ${!barcode || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {loading ? (
                        <span className="flex items-center justify-center"><Loader2 className="w-5 h-5 mr-2 animate-spin" /> QUERYING OPEN DATABASE...</span>
                      ) : (
                        <span className="flex items-center justify-center">QUERY MATRIX DATABASE <ScanLine className="w-5 h-5 ml-2" /></span>
                      )}
                    </button>

                  </div>
                </div>
              </form>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};

export default ScanProduct;
