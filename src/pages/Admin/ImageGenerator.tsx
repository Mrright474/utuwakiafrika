import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Download, Sparkles, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const defaultPrompts = {
  ubuntu: `A warm, dignified photograph-style image of an African community gathering under a golden sunset. Diverse African people of different ages - elders, adults, and children - coming together in unity and celebration. Warm earth tones with golden light rays symbolizing hope and ubuntu spirit. Traditional African patterns subtly integrated. High quality, emotional, inspiring. Style: Documentary photography with artistic lighting. Ultra high resolution.`,
  children: `Joyful African children learning together in a bright community classroom. Books, colorful educational materials, and warm smiles. Natural light streaming through windows creating a hopeful atmosphere. Earth tones with accents of warm gold and gentle green. Dignified, empowering representation. Documentary photography style. Ultra high resolution.`,
  community: `African community members working together on a sustainable development project. Hands building, planting, creating - symbolizing ubuntu philosophy of collective action. Golden hour lighting with warm earth tones. Diverse ages working in harmony. Inspirational and dignified. Documentary photography style. Ultra high resolution.`,
  celebration: `African cultural celebration with traditional music and dance. Colorful traditional attire, joyful expressions, community gathering. Warm sunset lighting with rich earth tones and golden accents. Celebrating heritage and unity. Documentary photography with artistic composition. Ultra high resolution.`
};

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState(defaultPrompts.ubuntu);
  const [size, setSize] = useState('1536x1024');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [revisedPrompt, setRevisedPrompt] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    setIsGenerating(true);
    setGeneratedImage(null);
    setRevisedPrompt(null);

    try {
      const { data, error } = await supabase.functions.invoke('generate-hero-image', {
        body: { prompt, size }
      });

      if (error) {
        throw error;
      }

      if (!data.success) {
        throw new Error(data.error || 'Failed to generate image');
      }

      setGeneratedImage(data.image);
      setRevisedPrompt(data.revised_prompt);
      toast.success('Image generated successfully!');
    } catch (error: any) {
      console.error('Error generating image:', error);
      toast.error(error.message || 'Failed to generate image');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;

    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `hero-image-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Image downloaded! Upload it to public/lovable-uploads/ to use on the site.');
  };

  const handlePresetSelect = (preset: keyof typeof defaultPrompts) => {
    setPrompt(defaultPrompts[preset]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Hero Image Generator</h2>
        <p className="text-muted-foreground">Generate custom hero images for your landing page using AI</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Generator Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-utu-gold" />
              Image Settings
            </CardTitle>
            <CardDescription>Configure your image generation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Quick Presets</Label>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => handlePresetSelect('ubuntu')}>
                  Ubuntu Community
                </Button>
                <Button variant="outline" size="sm" onClick={() => handlePresetSelect('children')}>
                  Education
                </Button>
                <Button variant="outline" size="sm" onClick={() => handlePresetSelect('community')}>
                  Development
                </Button>
                <Button variant="outline" size="sm" onClick={() => handlePresetSelect('celebration')}>
                  Celebration
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="prompt">Image Prompt</Label>
              <Textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the image you want to generate..."
                className="min-h-[200px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="size">Image Size</Label>
              <Select value={size} onValueChange={setSize}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1024x1024">1024x1024 (Square)</SelectItem>
                  <SelectItem value="1536x1024">1536x1024 (Landscape - Recommended)</SelectItem>
                  <SelectItem value="1024x1536">1024x1536 (Portrait)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleGenerate} 
              disabled={isGenerating}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Image
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-utu-green" />
              Preview
            </CardTitle>
            <CardDescription>Generated image preview</CardDescription>
          </CardHeader>
          <CardContent>
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center h-64 bg-muted rounded-lg">
                <Loader2 className="h-12 w-12 animate-spin text-utu-gold mb-4" />
                <p className="text-muted-foreground">Generating your image...</p>
                <p className="text-xs text-muted-foreground mt-1">This may take 30-60 seconds</p>
              </div>
            ) : generatedImage ? (
              <div className="space-y-4">
                <div className="relative rounded-lg overflow-hidden border">
                  <img 
                    src={generatedImage} 
                    alt="Generated hero image" 
                    className="w-full h-auto"
                  />
                </div>
                
                {revisedPrompt && (
                  <div className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                    <strong>AI Interpretation:</strong> {revisedPrompt}
                  </div>
                )}

                <Button onClick={handleDownload} variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Image
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  After downloading, upload the image to <code className="bg-muted px-1 rounded">public/lovable-uploads/</code> and update Hero.tsx to use it.
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 bg-muted rounded-lg">
                <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No image generated yet</p>
                <p className="text-xs text-muted-foreground mt-1">Click "Generate Image" to create one</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
