import React, { useState } from 'react';
import { Upload, FileSpreadsheet, X, Download, Eye, Calendar, FileText, Grid, List } from 'lucide-react';
import * as XLSX from 'xlsx';

export default function ImportApplication() {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [viewMode, setViewMode] = useState('card');
    const [fileToUpload, setFileToUpload] = useState(null);




    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileToUpload(file);
            setError("");
        }
    };

    const uploadFileToServer = async () => {
        if (!fileToUpload) {
            setError("Please select a file before uploading");
            return;
        }

        const formData = new FormData();
        formData.append("file", fileToUpload);

        try {
            setLoading(true);
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData
            });

            if (!res.ok) throw new Error("Upload failed");

            const data = await res.json();
            console.log("File uploaded successfully", data);
            alert("File uploaded successfully!");
            setFileToUpload(null);
        } catch (err) {
            console.error(err);
            setError("Error uploading file");
        } finally {
            setLoading(false);
        }
    };


    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (!file.name.toLowerCase().endsWith('.csv') &&
            !file.name.toLowerCase().endsWith('.xlsx') &&
            !file.name.toLowerCase().endsWith('.xls')) {
            setError('Please upload a CSV or Excel file (.csv, .xlsx, .xls)');
            return;
        }

        if (uploadedFiles.some(f => f.name === file.name)) {
            setError('A file with this name already exists');
            return;
        }

        setLoading(true);
        setError('');

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                let headers = [];
                let data = [];

                if (file.name.toLowerCase().endsWith('.csv')) {
                    const text = e.target.result;
                    const rows = text.split('\n').filter(row => row.trim());

                    if (rows.length > 0) {
                        headers = rows[0].split(',');
                        data = rows.slice(1).map(row => row.split(','));
                    }
                } else {
                    // Process Excel file
                    const workbook = XLSX.read(e.target.result, { type: 'array' });
                    const firstSheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[firstSheetName];
                    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                    if (jsonData.length > 0) {
                        headers = jsonData[0];
                        data = jsonData.slice(1);
                    }
                }

                const newFile = {
                    id: Date.now() + Math.random(),
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    uploadDate: new Date(),
                    headers: headers,
                    data: data,
                    rowCount: data.length,
                    file: file
                };

                setUploadedFiles(prev => [...prev, newFile]);
            } catch (err) {
                setError('Error reading file. Please make sure it\'s a valid file.');
                console.error('File parsing error:', err);
            } finally {
                setLoading(false);
            }
        };

        reader.readAsArrayBuffer(file);
        event.target.value = '';
    };

    const deleteFile = (fileId) => {
        setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
        if (selectedFile && selectedFile.id === fileId) {
            setSelectedFile(null);
        }
    };

    const openFile = (file) => {
        setSelectedFile(file);
    };

    const closeFileView = () => {
        setSelectedFile(null);
    };

    const downloadSample = () => {
        const sampleData = [
            ['Name', 'Email', 'Age', 'Department'],
            ['John Doe', 'john@example.com', '30', 'Engineering'],
            ['Jane Smith', 'jane@example.com', '25', 'Marketing'],
            ['Bob Johnson', 'bob@example.com', '35', 'Sales']
        ];

        const worksheet = XLSX.utils.aoa_to_sheet(sampleData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sample Data');
        XLSX.writeFile(workbook, 'sample_data.xlsx');
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i]);
    };

    const formatDate = (date) => {
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    };

    const FileCard = ({ file }) => (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                    <FileSpreadsheet className="text-green-600" size={24} />
                    <div>
                        <h3 className="font-semibold text-gray-800 truncate max-w-40" title={file.name}>
                            {file.name}
                        </h3>
                        <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                    </div>
                </div>
                <button
                    onClick={() => deleteFile(file.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                    title="Delete file"
                >
                    <X size={16} />
                </button>
            </div>

            <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar size={14} />
                    <span>{formatDate(file.uploadDate)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FileText size={14} />
                    <span>{file.rowCount} rows</span>
                </div>
            </div>

            <button
                onClick={() => openFile(file)}
                className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
            >
                <Eye size={16} />
                View Data
            </button>
        </div>
    );

    const FileListItem = ({ file }) => (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-center justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
                <FileSpreadsheet className="text-green-600" size={24} />
                <div>
                    <h3 className="font-semibold text-gray-800">{file.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{formatFileSize(file.size)}</span>
                        <span>{file.rowCount} rows</span>
                        <span>{formatDate(file.uploadDate)}</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => openFile(file)}
                    className="flex items-center gap-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    <Eye size={16} />
                    View
                </button>
                <button
                    onClick={() => deleteFile(file.id)}
                    className="text-red-500 hover:text-red-700 p-2"
                    title="Delete file"
                >
                    <X size={16} />
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                            <FileSpreadsheet className="text-green-600" />
                            File Import Manager
                        </h1>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={downloadSample}
                                className="flex items-center gap-2 px-4 py-2 rounded-[20px] bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                            >
                                <Download size={16} />
                                Download Sample
                            </button>
                        </div>
                    </div>

                    <div className="mb-6">
                        <div className="flex flex-col items-center justify-center rounded-lg p-8 text-center">
                            <Upload className="mx-auto text-gray-400 mb-4" size={48} />
                            <label className="cursor-pointer">
                                <div className="flex items-center gap-2 px-4 py-2 rounded-[20px] bg-blue-500 text-white hover:bg-blue-600 transition-colors">
                                    <Upload size={16} />
                                    Choose file to upload
                                </div>
                                <input
                                    type="file"
                                    accept=".csv,.xlsx,.xls"
                                    onChange={handleFileSelect}
                                    className="hidden"
                                />
                            </label>

                            {fileToUpload && (
                                <button
                                    onClick={uploadFileToServer}
                                    className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                >
                                    Upload
                                </button>
                            )}
                            <p className="mt-2 text-gray-500 text-sm">
                                Supports .csv, .xlsx, and .xls files
                            </p>
                        </div>
                    </div>

                    {loading && (
                        <div className="text-center py-8">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                            <p className="mt-2 text-gray-600">Processing file...</p>
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}

                    {uploadedFiles.length > 0 && (
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold text-gray-800">
                                    Uploaded Files ({uploadedFiles.length})
                                </h2>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setViewMode('card')}
                                        className={`p-2 rounded-lg ${viewMode === 'card' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}

                                    >
                                        <Grid size={16} />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'} `}
                                    >
                                        <List size={16} />
                                    </button>
                                </div>
                            </div>

                            {viewMode === 'card' ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                    {uploadedFiles.map(file => (
                                        <FileCard key={file.id} file={file} />
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {uploadedFiles.map(file => (
                                        <FileListItem key={file.id} file={file} />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {uploadedFiles.length === 0 && !loading && (
                        <div className="text-center py-12 text-gray-500">
                            <FileSpreadsheet size={64} className="mx-auto mb-4 text-gray-300" />
                            <p className="text-lg">No files uploaded yet</p>
                            <p className="text-sm">Upload files to see them here</p>
                        </div>
                    )}
                </div>

                {
                    selectedFile && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                            <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                                <div className="flex items-center justify-between p-4 border-b">
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {selectedFile.name}
                                    </h3>
                                    <button
                                        onClick={closeFileView}
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        <X size={24} />
                                    </button>
                                </div>

                                <div className="p-4 overflow-auto flex-grow">
                                    <div className="mb-4">
                                        <p className="text-gray-600">
                                            Showing {selectedFile.rowCount} rows • {formatFileSize(selectedFile.size)}
                                        </p>
                                    </div>

                                    <div className="border rounded-lg overflow-hidden">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    {selectedFile.headers.map((header, index) => (
                                                        <th
                                                            key={index}
                                                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            {header || `Column ${index + 1} `}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {selectedFile.data.map((row, rowIndex) => (
                                                    <tr key={rowIndex} className="hover:bg-gray-50">
                                                        {row.map((cell, cellIndex) => (
                                                            <td
                                                                key={cellIndex}
                                                                className="px-4 py-3 whitespace-nowrap text-sm text-gray-900"
                                                            >
                                                                {cell}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div >
        </div >
    );
}