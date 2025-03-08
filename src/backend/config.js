// Service.js
import axios from 'axios';
import conf from '../conf/conf.js';

export class Service {
    // 1️⃣ Upload Multiple Student Documents
    async uploadStudentDocuments(studentId, documents) {
        const formData = new FormData();
        formData.append('studentId', studentId);

        // Append provided documents
        for (const [key, file] of Object.entries(documents)) {
            if (file) {
                formData.append(key, file);
            }
        }

        try {
            const response = await axios.post(
                `${conf.backendUrl}/students/documents/upload`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            return response.data; // Return uploaded document details
        } catch (error) {
            console.error("Service :: uploadStudentDocuments :: error", error);
            throw error;
        }
    }

    // 2️⃣ Get All Uploaded Documents for a Student
    async getStudentDocuments(studentId) {
        try {
            const response = await axios.get(`${conf.backendUrl}/students/${studentId}/documents`);
            return response.data; // Return list of documents
        } catch (error) {
            console.error("Service :: getStudentDocuments :: error", error);
            return [];
        }
    }

    // 3️⃣ Delete a Student Document
    async deleteStudentDocument(studentId, documentId) {
        try {
            const response = await axios.delete(
                `${conf.backendUrl}/students/${studentId}/documents/${documentId}`
            );
            return response.status === 200;
        } catch (error) {
            console.error("Service :: deleteStudentDocument :: error", error);
            return false;
        }
    }

    // 4️⃣ Get Document Preview URL
    getDocumentPreviewUrl(documentId) {
        return `${conf.backendUrl}/students/documents/${documentId}/preview`;
    }
}

const service = new Service();
export default service;
