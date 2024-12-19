# API Endpoints

## Single File Upload

**Method:** POST  
**URL:** `http://localhost:3000/upload/single`  
**Form Data:**  
- **Key:** file  
- **Value:** Select a single file.  

**Validation:**  
- Only .jpg, .jpeg, .png, .pdf.  
- Max size: 2MB.  

## Multiple File Upload

**Method:** POST  
**URL:** `http://localhost:3000/upload/multiple`  
**Form Data:**  
- **Key:** files  
- **Value:** Select multiple files (max 5).  

**Validation:**  
- Same as single file validation.  

## Download File

**Method:** GET  
**URL:** `http://localhost:3000/download/:filename`  
Replace `:filename` with the uploaded file's name.  

## Static File Access

Access any uploaded file directly via:  
`http://localhost:3000/uploads/:filename`  

## Validation Features

- Only allows .jpg, .jpeg, .png, .pdf files.  
- Rejects files larger than 2MB.  
- Provides error messages for unsupported files or excessive size.  

## How to Test in Postman

### Single File Upload

**Method:** POST  
**URL:** `http://localhost:3000/upload/single`  
**Body:**  
- Form-data key: file  
- Value: Select a file.  

### Multiple File Upload

**Method:** POST  
**URL:** `http://localhost:3000/upload/multiple`  
**Body:**  
- Form-data key: files  
- Value: Select multiple files.  

### Invalid File

Try uploading a .txt file or file > 2MB. You should get an error message.  

### Download File

**URL:** `http://localhost:3000/download/:filename`
