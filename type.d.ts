// Di dalam file types.d.ts atau express.d.ts
import { UserPayload } from "./path/ke/interface/anda"; // Sesuaikan path sesuai kebutuhan

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

