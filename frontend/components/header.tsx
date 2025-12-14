import Image from "next/image"

export function Header() {
  return (
    <header className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="/logo-bkad-kota-bogor.png"
              alt="Logo BKAD Kota Bogor"
              width={60}
              height={60}
              className="rounded-full"
            />
            <div>
              <h1 className="text-2xl font-serif font-bold text-blue-900">PORTAL BKAD</h1>
              <p className="text-lg font-serif text-foreground">KOTA BOGOR</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
          </div>
        </div>
      </div>
    </header>
  )
}