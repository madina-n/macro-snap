import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

const plugins = []
if (process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY) {
  plugins.push(googleAI())
}

export const ai = genkit({
  plugins,
  model: 'googleai/gemini-2.0-flash-lite',
});
