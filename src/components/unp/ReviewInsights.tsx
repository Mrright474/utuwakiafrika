import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const EXAMPLES = [
  'What challenges came up most in field reports?',
  'How much was donated via MTN vs Airtel?',
  'Who made the most changes in the audit log?',
];

interface Props { from: string; to: string }

const ReviewInsights = ({ from, to }: Props) => {
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
    const { data, error: fnError } = await supabase.functions.invoke('review-insights', {
      body: { question: q, from: from || null, to: to || null },
    });
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

  const period = from || to ? `Using records from ${from || 'the beginning'} to ${to || 'today'}.` : 'Using all records you can view.';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg"><Sparkles className="mr-2 h-5 w-5" />Ask about these records</CardTitle>
        <CardDescription>AI-powered answers based only on the field reports, donations and audit entries you're allowed to see. {period}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="e.g. Summarise field findings from Kasese this month"
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

export default ReviewInsights;
