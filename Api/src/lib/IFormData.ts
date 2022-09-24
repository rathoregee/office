import { IAttachment } from "./IAttachment";

export interface IFormData {
  correlationId: string;
  client: string;
  from: string;
  to: string[];
  cc: string[];
  bcc: string[];
  subject: string;
  body: string;
  isHtmlBody: string;
  priority: string;
  templateId: string;
  attachment: IAttachment;
}
