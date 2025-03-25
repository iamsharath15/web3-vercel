'use client';

import React, { useState, useCallback, useRef } from 'react';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useDropzone } from 'react-dropzone';

interface ImageUploadProps {
  onUpload: (imageUrl: string) => void;
}

const DEFAULT_IMAGE = '/assets/image/NWEB4.png';

const bucketName = "nweb4-image-bucket";
const region = "ap-south-1"

if (!bucketName || !region) {
  throw new Error("AWS S3 Bucket or Region is missing in environment variables.");
}

const s3Client = new S3Client({
  region: region,
  credentials: {
    accessKeyId: "aws",
    secretAccessKey: "aws",
  },
});

const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload }) => {
  const [image, setImage] = useState<string>(DEFAULT_IMAGE);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Upload file to S3
  const uploadToS3 = async (file: File) => {
    setLoading(true);
    try {
      const fileName = `uploads/${Date.now()}-${file.name}`;
  
      console.log("Uploading to S3 Bucket:", bucketName);
      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: fileName,
        Body: buffer,
        ContentType: file.type, 

      });
  
      await s3Client.send(command);
      const imageUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${fileName}`;
  
      setImage(imageUrl);
      onUpload(imageUrl);
    } catch (error) {
      console.error('S3 Upload Error:', error);
    } finally {
      setLoading(false);
    }
  };
  

  // Handle selected file
  const handleFileChange = (file: File) => {
    uploadToS3(file);
  };

  // Drag and Drop handler
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      handleFileChange(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1,
  });

  return (
    <div className="relative w-full h-80 flex items-center justify-center bg-gradient-to-br from-purple-500 to-red-500 rounded-xl">
      <img
        src={image}
        alt="Uploaded"
        className="w-full h-full object-cover rounded-xl"
      />

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <button
            className="absolute bottom-4 right-4 w-10 h-10 p-3 hover:text-blue-600 bg-white rounded-full flex items-center justify-center shadow-md"
            onClick={() => setIsOpen(true)}
          >
            +
          </button>
        </DialogTrigger>

        <DialogContent className="w-6/12 bg-[#1c1e21]/90 border-0 text-[#d1d1d2]">
          <DialogHeader>
            <DialogTitle>Upload Image</DialogTitle>
          </DialogHeader>

          <div
            {...getRootProps()}
            className="border-2 border-dashed !border-gray-300 rounded-lg p-6 text-center cursor-pointer"
          >
            <input {...getInputProps()} />
            <p className="text-[#d1d1d2]">
              Drag & drop an image here, or click to select
            </p>
          </div>

          {image !== DEFAULT_IMAGE && (
            <div className="mt-4">
              <img src={image} alt="Preview" className="w-full rounded-md" />
            </div>
          )}

          <Button
            className="w-full mt-4 bg-white hover:bg-[#717171] hover:text-white text-black font-semibold"
            onClick={() => fileInputRef.current?.click()}
            disabled={loading}
          >
            {loading ? 'Uploading...' : 'Choose file'}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) =>
              e.target.files && handleFileChange(e.target.files[0])
            }
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageUpload;
