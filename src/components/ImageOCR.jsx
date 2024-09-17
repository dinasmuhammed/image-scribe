import React, { useState } from 'react';
import { createWorker } from 'tesseract.js';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Loader2, Upload, Copy, Trash2 } from "lucide-react";
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
    if (!image) return;

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
      setText('Error extracting text. Please try again.');
      toast.error('Failed to extract text. Please try again.');
    } finally {
      await worker.terminate();
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    toast.success('Text copied to clipboard');
  };

  const clearAll = () => {
    setImage(null);
    setText('');
    toast.info('All content cleared');
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto bg-card text-card-foreground shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-primary">Image OCR</h2>
      <div className="space-y-4">
        <Input type="file" accept="image/*" onChange={handleImageUpload} className="mb-2 bg-input text-input-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" />
        {image && (
          <div className="mt-4">
            <img src={image} alt="Uploaded" className="max-w-full h-auto mb-4 rounded-lg shadow-md" />
            <Button onClick={extractText} disabled={isLoading} className="mr-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
              {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing</> : <><Upload className="mr-2 h-4 w-4" /> Extract Text</>}
            </Button>
            <Button onClick={clearAll} variant="outline" className="bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors">
              <Trash2 className="mr-2 h-4 w-4" /> Clear All
            </Button>
          </div>
        )}
        {text && (
          <div className="mt-4">
            <Textarea value={text} readOnly className="w-full h-32 mb-2 bg-muted text-muted-foreground resize-none" />
            <Button onClick={copyToClipboard} className="bg-accent text-accent-foreground hover:bg-accent/90 transition-colors">
              <Copy className="mr-2 h-4 w-4" /> Copy to Clipboard
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ImageOCR;
