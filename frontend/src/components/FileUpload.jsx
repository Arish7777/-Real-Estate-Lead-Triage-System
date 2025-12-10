import React, { useRef, useState, useEffect } from 'react';
import { Upload, FileText, CheckCircle, CloudUpload, Clock } from 'lucide-react';

const FileUpload = ({ uploading, onUpload }) => {
    const fileInputRef = useRef(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);

    // Timer effect - counts seconds while uploading
    useEffect(() => {
        let interval;
        if (uploading) {
            setElapsedTime(0);
            interval = setInterval(() => {
                setElapsedTime(prev => prev + 1);
            }, 1000);
        } else {
            setElapsedTime(0);
        }
        return () => clearInterval(interval);
    }, [uploading]);

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file && file.name.endsWith('.csv')) {
            const event = { target: { files: [file] } };
            onUpload(event);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    return (
        <div
            className={`card border-0 p-5 text-center cursor-pointer position-relative overflow-hidden`}
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            style={{
                background: isDragOver
                    ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)'
                    : 'linear-gradient(135deg, rgba(30, 41, 59, 0.5) 0%, rgba(15, 23, 42, 0.5) 100%)',
                border: `2px dashed ${isDragOver ? '#3b82f6' : 'rgba(255, 255, 255, 0.1)'}`,
                transition: 'all 0.3s ease',
                minHeight: '250px'
            }}
        >
            {/* Animated background circles */}
            <div
                className="position-absolute"
                style={{
                    top: '-50px',
                    right: '-50px',
                    width: '150px',
                    height: '150px',
                    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
                    borderRadius: '50%',
                    animation: 'float 6s ease-in-out infinite'
                }}
            />
            <div
                className="position-absolute"
                style={{
                    bottom: '-30px',
                    left: '-30px',
                    width: '100px',
                    height: '100px',
                    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
                    borderRadius: '50%',
                    animation: 'float 4s ease-in-out infinite reverse'
                }}
            />

            <input
                type="file"
                ref={fileInputRef}
                onChange={onUpload}
                accept=".csv"
                className="d-none"
            />

            {uploading ? (
                <div className="position-relative z-1">
                    <div
                        className="spinner-border text-primary mb-4"
                        style={{ width: '60px', height: '60px', borderWidth: '4px' }}
                    />
                    <p className="h5 text-white fw-bold mb-2">Processing Leads...</p>
                    <p className="text-muted small mb-2">AI is analyzing your data</p>

                    {/* Timer display */}
                    <div
                        className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill mb-3"
                        style={{
                            background: 'rgba(59, 130, 246, 0.15)',
                            border: '1px solid rgba(59, 130, 246, 0.3)'
                        }}
                    >
                        <Clock size={16} className="text-primary" />
                        <span className="text-white fw-semibold" style={{ fontVariantNumeric: 'tabular-nums' }}>
                            {elapsedTime < 60
                                ? `${elapsedTime}s`
                                : `${Math.floor(elapsedTime / 60)}m ${elapsedTime % 60}s`
                            }
                        </span>
                    </div>

                    {/* Progress dots */}
                    <div className="d-flex justify-content-center gap-2 mt-2">
                        {[0, 1, 2].map(i => (
                            <div
                                key={i}
                                className="rounded-circle"
                                style={{
                                    width: '8px',
                                    height: '8px',
                                    background: '#3b82f6',
                                    animation: `pulse 1.5s ease-in-out ${i * 0.2}s infinite`
                                }}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="position-relative z-1">
                    <div
                        className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4"
                        style={{
                            width: '80px',
                            height: '80px',
                            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)',
                            boxShadow: '0 8px 32px rgba(59, 130, 246, 0.2)'
                        }}
                    >
                        <CloudUpload
                            size={36}
                            className={`text-primary ${isDragOver ? 'animate-float' : ''}`}
                        />
                    </div>

                    <p className="h5 text-white fw-bold mb-2">
                        {isDragOver ? 'Drop your file here!' : 'Click to upload or drag and drop'}
                    </p>

                    <p className="text-muted small mb-4">CSV files only (max 10MB)</p>

                    <div
                        className="d-inline-flex align-items-center gap-2 px-4 py-2 rounded-pill"
                        style={{
                            background: 'rgba(59, 130, 246, 0.1)',
                            border: '1px solid rgba(59, 130, 246, 0.2)'
                        }}
                    >
                        <FileText size={16} className="text-primary" />
                        <span className="small text-muted">Supports: name, email, phone, message, location, budget</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FileUpload;
