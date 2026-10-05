import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const EXAMPLES = [
  'How much was confirmed via MTN this month?',
  'Who are the top 5 donors by total amount?',
  'How many donations are still pending?',
];

const DonationInsights = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const ask = async () => {
    const q = question.trim();
    if (!q || loading) return;
    setLoading(true);
    setError('');
    setAnswer('');
    const { data, error: fnError } = await supabase.functions.invoke('donation-insights', { body: { question: q } });
    if (fnError) {
      let msg = 'The AI could not answer right now.';
      try {
        const body = await (fnError as { context?: Response }).context?.json();
        if (body?.error) msg = body.error;
      } catch { /* ignore */ }
      setError(msg);
    } else if (data?.error) {
      setError(data.error);
    } else {
      setAnswer(data?.answer ?? '');
    }
    setLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center"><Sparkles className="mr-2 h-5 w-5" />Ask about donations</CardTitle>
        <CardDescription>Ask a question in plain words and get an AI-powered answer from your saved donation records.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="e.g. What is the total confirmed via Airtel this week?"
          maxLength={1000}
          rows={2}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); ask(); } }}
        />
        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={ask} disabled={loading || !question.trim()}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
            Ask
          </Button>
          {EXAMPLES.map((ex) => (
            <Button key={ex} variant="ghost" size="sm" onClick={() => setQuestion(ex)} disabled={loading}>{ex}</Button>
          ))}
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        {answer && <div className="whitespace-pre-wrap rounded-md border bg-muted/40 p-4 text-sm">{answer}</div>}
      </CardContent>
    </Card>
  );
};

export default DonationInsights;
