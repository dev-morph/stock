import { CreateUser } from '@/app/ui/user/buttons';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import UsersTable from '@/app/ui/user/table';

export default function Page() {
    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Users</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <div className="flex-1"></div>
                <CreateUser />
            </div>
            <Suspense fallback={<div>Loading...</div>}>
                <UsersTable />
            </Suspense>
        </div>
    );
}