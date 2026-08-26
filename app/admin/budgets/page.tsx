import Grill from '@/app/(index)/_components/grill/Grill';
import PresupuestosTable from '@/app/_components/Admin/PresupuestosTable'
import { getPresupuestos } from "@/lib/pricesActions";

/* NO CACHE */
export const dynamic = 'force-dynamic'

const BudgetsPage = async () => {
    const [presupuestos] = await Promise.all([
        getPresupuestos(),
    ]);

    return (
        <>
            <Grill />
            <PresupuestosTable presupuestos={presupuestos} />
            
        </>
    )
}

export default BudgetsPage