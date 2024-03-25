import { Images } from 'src/assets'

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <img src={Images.Logo} alt="Arent" className="max-w-20" />
    </div>
  )
}
