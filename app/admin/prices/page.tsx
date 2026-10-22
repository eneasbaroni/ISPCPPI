import { getPrices, getSugerenciasPrecios } from "@/lib/pricesActions";
import PricesForm from "@/app/_components/Admin/PricesForm";
import LogoutButton from "@/app/_components/Admin/LogoutButton";
import Grill from "@/app/(index)/_components/grill/Grill";

/* NO CACHE */
export const dynamic = 'force-dynamic'

const PricesPage = async () => {
    const [prices, sugerencias] = await Promise.all([
        getPrices(),
        getSugerenciasPrecios(),
    ]);
    return (
        <>
            <Grill />
            <PricesForm prices={prices} sugerencias={sugerencias} />
            <div className="w-full flex justify-end">
                <LogoutButton />
            </div>
        </>
    )
}

export default PricesPage