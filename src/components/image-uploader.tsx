"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, FileImage, RefreshCcw, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

interface ImageUploaderProps {
  value?: string;
  onChange: (value?: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ value, onChange }) => {
  const { toast } = useToast();
  const [mode, setMode] = useState<'idle' | 'upload' | 'camera'>('idle');
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const stopCameraStream = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  }, []);

  useEffect(() => {
    if (mode === 'camera') {
      const getCameraPermission = async () => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          toast({ variant: 'destructive', title: 'Camera not supported' });
          setHasCameraPermission(false);
          return;
        }
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          setHasCameraPermission(true);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error('Error accessing camera:', error);
          setHasCameraPermission(false);
          toast({
            variant: 'destructive',
            title: 'Camera Access Denied',
            description: 'Please enable camera permissions in your browser settings.',
          });
        }
      };
      getCameraPermission();
    } else {
      stopCameraStream();
    }

    return () => {
      stopCameraStream();
    };
  }, [mode, toast, stopCameraStream]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB limit
        toast({ variant: 'destructive', title: 'File is too large', description: 'Please select an image smaller than 4MB.' });
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        onChange(e.target?.result as string);
        setMode('idle');
      };
      reader.readAsDataURL(file);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      const dataUri = canvas.toDataURL('image/jpeg');
      onChange(dataUri);
      setMode('idle');
    }
  };

  const clearImage = () => {
    onChange(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (value) {
    return (
      <div className="relative w-full max-w-sm">
        <img src={value} alt="Product preview" className="w-full h-auto rounded-md border" />
        <Button
          type="button"
          variant="destructive"
          size="icon"
          className="absolute top-2 right-2 rounded-full h-8 w-8"
          onClick={clearImage}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  if (mode === 'camera') {
    return (
      <div className="space-y-4">
        <div className="relative w-full aspect-video rounded-md border bg-muted overflow-hidden">
            <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline muted />
            <canvas ref={canvasRef} className="hidden" />
        </div>
        {hasCameraPermission === false && (
            <Alert variant="destructive">
                <AlertTitle>Camera Access Required</AlertTitle>
                <AlertDescription>
                Please allow camera access in your browser to use this feature. You may need to refresh the page after granting permission.
                </AlertDescription>
            </Alert>
        )}
        <div className="flex gap-2">
          <Button type="button" onClick={capturePhoto} disabled={!hasCameraPermission}>
            <Camera className="mr-2" /> Take Photo
          </Button>
          <Button type="button" variant="ghost" onClick={() => setMode('idle')}>Cancel</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 border-dashed border-2 rounded-md flex flex-col items-center justify-center text-center gap-4 bg-card">
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <Button type="button" onClick={() => fileInputRef.current?.click()}>
          <FileImage className="mr-2" /> Upload Image
        </Button>
        <Button type="button" onClick={() => setMode('camera')}>
          <Camera className="mr-2" /> Use Camera
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">Max file size: 4MB</p>
    </div>
  );
};

export default ImageUploader;
