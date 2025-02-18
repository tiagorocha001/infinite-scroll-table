export interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
  }
  
  export interface TableColumn {
    id: keyof Post;
    label: string;
    minWidth?: number;
  }