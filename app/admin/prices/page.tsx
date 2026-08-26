import { getPrices } from "@/lib/pricesActions";
import PricesForm from "@/app/_components/Admin/PricesForm";
import LogoutButton from "@/app/_components/Admin/LogoutButton";
import Grill from "@/app/(index)/_components/grill/Grill";

/* NO CACHE */
export const dynamic = 'force-dynamic'

const PricesPage = async () => {
    const [prices,] = await Promise.all([
        getPrices(),
    ]);
    return (
        <>
            <Grill />
            <PricesForm prices={prices} />
            <div className="w-full flex justify-end">
                <LogoutButton />
            </div>
        </>
    )
}

export default PricesPage