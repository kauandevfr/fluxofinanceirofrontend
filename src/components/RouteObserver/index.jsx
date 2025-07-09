import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useGlobalContext } from '../../providers/globalContext';

export default function RouteObserver() {

    const { redirect, queryParams } = useGlobalContext()

    const location = useLocation();
    const { query } = queryParams();
    useEffect(() => {
        const path = location.pathname;
        const isOnExpensesOrIncomes = path === '/expenses/' || path === '/incomes/';

        if (!isOnExpensesOrIncomes) {
            const mes = query.get('mes');
            const ano = query.get('ano');

            const newParams = new URLSearchParams();
            if (mes) newParams.set('mes', mes);
            if (ano) newParams.set('ano', ano);

            redirect(`${path}?${newParams.toString()}`, { replace: true });
        }
    }, [location.pathname]);

    return null;
};

