import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export function WelcomeSection() {
  return (
    <section className="py-12 bg-card/50">
      <div className="max-w-7xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-serif text-center">Sambutan Kepala BKAD Kota Bogor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <Image
                src="/professional-indonesian-government-official-portra.jpg"
                alt="Kepala BKAD Kota Bogor"
                width={150}
                height={200}
                className="rounded-lg mx-auto md:mx-0"
              />
              <div className="flex-1 space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Selamat datang di website resmi Badan Keuangan dan Aset Daerah (BKAD) Kota Bogor. Kami berkomitmen
                  untuk memberikan pelayanan terbaik dalam pengelolaan keuangan dan aset daerah dengan prinsip
                  transparansi, akuntabilitas, dan profesionalisme.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Melalui website ini, kami menyediakan berbagai informasi dan layanan publik yang dapat diakses dengan
                  mudah oleh masyarakat Kota Bogor. Mari bersama-sama membangun Kota Bogor yang lebih maju dan
                  sejahtera.
                </p>
                <div className="pt-4">
                  <p className="font-semibold">RUDY MASHUDI ,ST. , MP. </p>
                  <p className="text-sm text-muted-foreground">Kepala BKAD Kota Bogor</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
