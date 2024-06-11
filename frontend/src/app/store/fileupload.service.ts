import { Injectable, inject } from '@angular/core';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { uploadBytes } from 'firebase/storage';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private readonly storage: Storage = inject(Storage);
  async uploadFile(file: File, category: string, filename: string) {
    if (file) {
      const storageRef = ref(this.storage, `${category}-${filename}`);
      const uploadTask = await uploadBytesResumable(storageRef, file);

      let url = await getDownloadURL(uploadTask.ref);

      return url;
    }
    return '';
  }
}
