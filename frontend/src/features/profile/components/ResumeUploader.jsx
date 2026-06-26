import { useState, useRef } from 'react';
import { FiUploadCloud, FiFileText, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

export const ResumeUploader = ({ resumeUrl, onUpload }) => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (selectedFile) => {
    setError(null);
    setSuccess(false);

    // Validate type (PDF only)
    if (selectedFile.type !== 'application/pdf') {
      setError('Only PDF documents are allowed.');
      setFile(null);
      return;
    }

    // Validate size (5MB limit)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('File size exceeds the 5 MB limit.');
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const triggerUpload = async () => {
    if (!file) return;

    setUploading(true);
    setError(null);
    setSuccess(false);
    setProgress(0);

    try {
      await onUpload(file, (percent) => {
        setProgress(percent);
      });
      setSuccess(true);
      setFile(null); // Clear selected file after success
    } catch (err) {
      setError(err.message || 'Failed to upload resume.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md space-y-6 w-full">
      <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center space-x-2">
        <FiFileText className="text-sky-500" />
        <span>Resume Attachment</span>
      </h3>

      <div className="space-y-4">
        {/* Drag & Drop Container */}
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current.click()}
          className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${
            dragActive
              ? 'border-sky-500 bg-sky-500/10 scale-[0.99]'
              : 'border-slate-800 bg-slate-950/40 hover:border-sky-500/30'
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleChange}
            accept="application/pdf"
            className="hidden"
          />

          <FiUploadCloud className="w-12 h-12 text-slate-500 mx-auto mb-4 group-hover:text-sky-400" />
          <p className="text-sm font-semibold text-slate-300">
            Drag & drop your resume here, or <span className="text-sky-400">browse</span>
          </p>
          <p className="text-xs text-slate-500 mt-2">PDF formats only (Max 5MB)</p>
        </div>

        {/* Selected File Details */}
        {file && (
          <div className="p-4 bg-slate-950 border border-slate-850 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 animate-fadeIn">
            <div className="flex items-center space-x-3 text-left">
              <FiFileText className="w-8 h-8 text-sky-400 shrink-0" />
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-slate-200 truncate max-w-[200px] sm:max-w-xs">{file.name}</p>
                <p className="text-[10px] text-slate-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
              </div>
            </div>

            <button
              type="button"
              disabled={uploading}
              onClick={triggerUpload}
              className="w-full sm:w-auto px-5 py-2 text-xs font-bold bg-sky-500 hover:bg-sky-400 text-slate-950 rounded-lg transition-all"
            >
              Upload File
            </button>
          </div>
        )}

        {/* Upload Progress Bar */}
        {uploading && (
          <div className="space-y-2 animate-fadeIn">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Uploading resume...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-850">
              <div
                className="bg-sky-500 h-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Feedback Cards */}
        {success && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl flex items-center space-x-2 animate-fadeIn">
            <FiCheckCircle className="shrink-0 w-4 h-4" />
            <span>Resume uploaded and saved successfully!</span>
          </div>
        )}

        {error && (
          <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-xl flex items-center space-x-2 animate-fadeIn">
            <FiAlertCircle className="shrink-0 w-4 h-4" />
            <span>{error}</span>
          </div>
        )}

        {/* Resume Preview */}
        {resumeUrl && !file && !uploading && (
          <div className="space-y-3 animate-fadeIn">
            <div className="p-4 bg-slate-950 border border-slate-850 rounded-xl flex items-center justify-between">
              <div className="flex items-center space-x-3 text-left">
                <FiFileText className="w-8 h-8 text-emerald-400 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-slate-200">Active Resume Attachment</p>
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] text-sky-400 hover:underline"
                  >
                    Download / View full document
                  </a>
                </div>
              </div>
            </div>

            {/* Iframe Preview wrapper */}
            {resumeUrl.startsWith('http') && (
              <div className="border border-slate-850 rounded-2xl overflow-hidden bg-slate-950/40">
                <div className="p-3 bg-slate-950 border-b border-slate-850 flex items-center justify-between text-[10px]">
                  <span className="font-semibold text-slate-400">PDF Viewer Panel</span>
                  <span className="text-slate-600">Encrypted transmission</span>
                </div>
                <div className="h-56 w-full">
                  <iframe
                    src={`${resumeUrl}#toolbar=0`}
                    className="w-full h-full border-none opacity-80"
                    title="Resume Document Preview"
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeUploader;
