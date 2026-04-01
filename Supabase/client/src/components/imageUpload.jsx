// A simple, clean file picker using daisyUI
function ImageUpload({ onFileSelect, selectedFile }) {
  return (
    <div className="form-control w-full mb-4">
      <label className="label pb-1">
        <span className="label-text text-xs uppercase font-bold opacity-60">Upload Image (Optional)</span>
      </label>
      <input 
        type="file" 
        accept="image/*" 
        className="file-input file-input-bordered file-input-primary file-input-sm w-full" 
        onChange={(e) => onFileSelect(e.target.files[0])}
      />
      {/* Show the filename if one is selected */}
      {selectedFile && (
        <p className="text-xs mt-1 text-success">✓ {selectedFile.name}</p>
      )}
    </div>
  );
}

export default ImageUpload;