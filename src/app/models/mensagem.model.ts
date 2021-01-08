export class Mensagem {    
  severity: string;    
  summary: string;    
  detail:any;

      constructor(severity: string, summary: string, detail:any)
      {        
        this.severity = severity;        
        this.summary = summary;        
        this.detail = detail;    
      }
}
