export interface ZeroxArgs {
  cleanup?: boolean;
  concurrency?: number;
  correctOrientation?: boolean;
  credentials?: ModelCredentials;
  errorMode?: ErrorMode;
  filePath: string;
  imageDensity?: number;
  imageHeight?: number;
  llmParams?: LLMParams;
  maintainFormat?: boolean;
  maxRetries?: number;
  maxTesseractWorkers?: number;
  model?: ModelOptions | string;
  modelProvider?: ModelProvider | string;
  onPostProcess?: (params: {
    page: Page;
    progressSummary: Summary;
  }) => Promise<void>;
  onPreProcess?: (params: {
    imagePath: string;
    pageNumber: number;
  }) => Promise<void>;
  openaiAPIKey?: string;
  outputDir?: string;
  pagesToConvertAsImages?: number | number[];
  tempDir?: string;
  trimEdges?: boolean;
}

export interface ZeroxResponse {
  completionTime: number;
  fileName: string;
  inputTokens: number;
  outputTokens: number;
  pages: Page[];
  summary: Summary;
}

export interface BedrockCredentials {
  accessKeyId?: string;
  region: string;
  secretAccessKey?: string;
  sessionToken?: string;
}

export interface OpenAICredentials {
  apiKey: string;
}

type ModelCredentials = BedrockCredentials | OpenAICredentials;

export enum ModelOptions {
  BEDROCK_CLAUDE_3_SONNET = "anthropic.claude-3-5-sonnet-20240620-v1:0",
  GPT_4O = "gpt-4o",
  GPT_4O_MINI = "gpt-4o-mini",
}

export enum ModelProvider {
  BEDROCK = "BEDROCK",
  OPENAI = "OPENAI",
}

export enum PageStatus {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export interface Page {
  content: string;
  contentLength: number;
  page: number;
  status: PageStatus;
  error?: string;
  inputTokens?: number;
  outputTokens?: number;
}

export interface CompletionArgs {
  image: Buffer;
  maintainFormat: boolean;
  priorPage: string;
}

export interface CompletionResponse {
  content: string;
  inputTokens: number;
  outputTokens: number;
}

export interface CreateModelArgs {
  credentials: ModelCredentials;
  llmParams: Partial<LLMParams>;
  model: ModelOptions | string;
  provider: ModelProvider | string;
}

export enum ErrorMode {
  THROW = "THROW",
  IGNORE = "IGNORE",
}

export interface LLMParams {
  frequencyPenalty?: number;
  maxTokens?: number;
  presencePenalty?: number;
  temperature?: number;
  topP?: number;
}

export interface ModelInterface {
  getCompletion(params: CompletionArgs): Promise<CompletionResponse>;
}

export interface Summary {
  numPages: number;
  numSuccessfulPages: number;
  numFailedPages: number;
}
