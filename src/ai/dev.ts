import { config } from 'dotenv';
config();

import '@/ai/flows/translate-mcq.ts';
import '@/ai/flows/generate-mcq.ts';
import '@/ai/flows/explain-answer.ts';