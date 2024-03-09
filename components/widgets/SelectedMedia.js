import BeatLoader from 'react-spinners/BeatLoader'
import { computeFileSize } from '@utils/computeFileProps'
import { truncateFileName } from '@utils/truncateFileName'

const OverlayRemoveButton = ({ onClick }) => (
  <div 
    className='absolute inset-0 flex items-center justify-center opacity-0 bg-black transition duration-300 ease-in-out group-hover:opacity-50 cursor-pointer'
    onClick={onClick}>
      <p className='text-slate-100 text-xl'>remove</p>
  </div>
)

const SelectedMedia = ({ selectedFile, onClick, isLoading }) => 
(
  <div className='relative bg-slate-800 w-full md:fit h-36 border-8 rounded-2xl border-slate-200 p-1 flex flex-row shadow-xl hover:shadow-2xl'>
    {selectedFile.type.startsWith('image/') && (
      <div className='relative group w-fit'>
        <img 
          src={URL.createObjectURL(selectedFile)} 
          alt='selected media' 
          className='h-28 w-28 border-2 rounded-lg border-slate-100 object-cover' />
        <OverlayRemoveButton onClick={onClick} />
      </div>
    )}
    {selectedFile.type.startsWith('video/') && (
      <div className='relative group w-fit'>
        <video 
          src={URL.createObjectURL(selectedFile)} 
          muted 
          autoPlay 
          loop 
          className='h-28 w-28 border-2 rounded-lg border-slate-100 object-cover' />
        <OverlayRemoveButton onClick={onClick} />
      </div>
    )}
    {selectedFile.type.startsWith('audio/') && (
      <div className='relative group w-fit'>
        <img 
          src='https://res.cloudinary.com/dfgh07xa9/image/upload/v1709244025/music-player-svgrepo-com_qzb6ex.svg' 
          alt='selected media' 
          className='h-28 w-28 border-2 rounded-lg border-slate-100 bg-slate-300 object-cover' />
        <OverlayRemoveButton onClick={onClick} />
      </div>
    )}
    {/* file properties */}
    <div className='bg-rose-30 p-2 pt-0 flex flex-col justify-start items-start'>
      <p className='text-blue-600 text-lg cursor-default'>
        {truncateFileName(selectedFile.name, 100)}</p>
      <p className='text-slate-200 text-sm italic cursor-default'>
        {computeFileSize(selectedFile.size)}</p>
      {(isLoading.chooseMedia) && (
        <BeatLoader 
          color='#E2E8F0' 
          className='mt-4' 
          margin={2} 
          size={12}
        />
      )}
    </div>
  </div>
)

export default SelectedMedia