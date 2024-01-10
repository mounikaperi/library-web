class MessageModel {
  title: string;
  question: string;
  id?: number;
  userEmail?: string;
  adminEmail?: string;
  reponse?: string;
  closed?: boolean;

  constructor(title: string, question: string) {
    this.title = title;
    this.question = question;
  }
}