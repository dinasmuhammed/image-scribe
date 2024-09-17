import React, { useState } from 'react';
import { createWorker } from 'tesseract.js';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Loader2, Upload, Copy, Trash2, Image as ImageIcon } from "lucide-react";
import { toast } from 'sonner';

const ImageOCR = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const extractText = async () => {
    if (!image) {
      toast.error('Please upload an image first');
      return;
    }

    setIsLoading(true);
    setText('');

    const worker = await createWorker();
    try {
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      const { data: { text } } = await worker.recognize(image);
      setText(text);
      toast.success('Text extracted successfully');
    } catch (error) {
      console.error('OCR Error:', error);
      setText('');
      toast.error('Failed to extract text. Please try again.');
    } finally {
      await worker.terminate();
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (text) {
      navigator.clipboard.writeText(text);
      toast.success('Text copied to clipboard');
    } else {
      toast.error('No text to copy');
    }
  };

  const clearAll = () => {
    setImage(null);
    setText('');
    toast.info('All content cleared');
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto bg-card text-card-foreground shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-primary">LuminaText OCR</h2>
      <div className="space-y-6">
        <div className="flex items-center justify-center w-full">
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted/70 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <ImageIcon className="w-10 h-10 mb-3 text-muted-foreground" />
              <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-muted-foreground">PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <Input id="dropzone-file" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>
        </div>
        {image && (
          <div className="mt-6">
            <img src={image} alt="Uploaded" className="max-w-full h-auto mb-4 rounded-lg shadow-md" />
            <div className="flex space-x-2">
              <Button onClick={extractText} disabled={isLoading} className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing</> : <><Upload className="mr-2 h-4 w-4" /> Extract Text</>}
              </Button>
              <Button onClick={clearAll} variant="outline" className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors">
                <Trash2 className="mr-2 h-4 w-4" /> Clear All
              </Button>
            </div>
          </div>
        )}
        {text && (
          <div className="mt-6">
            <Textarea value={text} readOnly className="w-full h-32 mb-4 bg-muted text-muted-foreground resize-none" />
            <Button onClick={copyToClipboard} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 transition-colors">
              <Copy className="mr-2 h-4 w-4" /> Copy to Clipboard
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ImageOCR;
