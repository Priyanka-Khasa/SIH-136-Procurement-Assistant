import React from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { StatTile } from '../components/ui/StatTile';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { LifecycleRail } from '../components/workflow/LifecycleRail';
import { WhyBlocked } from '../components/workflow/WhyBlocked';
import { Plus, Download } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', claims: 4000 },
  { name: 'Feb', claims: 3000 },
  { name: 'Mar', claims: 5000 },
  { name: 'Apr', claims: 2780 },
  { name: 'May', claims: 6890 },
  { name: 'Jun', claims: 8390 },
];

export default function WorkspaceDashboard() {
  return (
    <div className='p-6 max-w-7xl mx-auto fade-in'>
      <PageHeader 
        title='Workspace Overview' 
        eyebrow='Global Supply Chain'
        actionSlot={
          <>
            <Button variant='outline' leftIcon={<Download size={16} />}>Export</Button>
            <Button variant='primary' leftIcon={<Plus size={16} />}>New Claim</Button>
          </>
        }
      />

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
        <StatTile title='Total Verifications' value={12489} trend={12} />
        <StatTile title='Pending Claims' value={432} trend={-5} />
        <StatTile title='Disputed Records' value={18} trend={2} />
      </div>

      <Card className='p-6 mb-8'>
        <div className='mb-5 flex flex-wrap items-end justify-between gap-3'>
          <div>
            <p className='text-xs uppercase tracking-[0.18em] text-muted'>Pilot lifecycle</p>
            <h2 className='mt-1 font-heading text-2xl font-semibold text-text'>Pilot Evidence Passport</h2>
          </div>
          <span className='rounded-full border border-amber/30 bg-amber/10 px-3 py-1 text-xs text-amber'>Demo state: evidence pending</span>
        </div>
        <LifecycleRail currentStage='Pilot Running' blockedStage='Evidence Submitted' />
        <div className='mt-6'>
          <WhyBlocked dependency='evidence' milestone='Evidence Submitted' />
        </div>
      </Card>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <Card className='lg:col-span-2 p-6'>
          <h3 className='text-lg font-semibold mb-6'>Verification Volume</h3>
          <div className='h-[300px] w-full'>
            <ResponsiveContainer width='100%' height='100%'>
              <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id='colorClaims' x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='5%' stopColor='var(--saffron)' stopOpacity={0.8}/>
                    <stop offset='95%' stopColor='var(--saffron)' stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray='3 3' stroke='var(--border)' vertical={false} />
                <XAxis dataKey='name' stroke='var(--muted)' tick={{fill: 'var(--muted)'}} axisLine={false} tickLine={false} />
                <YAxis stroke='var(--muted)' tick={{fill: 'var(--muted)'}} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--text)' }}
                />
                <Area type='monotone' dataKey='claims' stroke='var(--saffron)' strokeWidth={2} fillOpacity={1} fill='url(#colorClaims)' />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className='p-6 bg-gradient-to-b from-surface to-raised border-saffron/30 relative overflow-hidden'>
           <div className='absolute top-0 right-0 w-32 h-32 bg-saffron/10 rounded-full blur-[40px] pointer-events-none'></div>
           <h3 className='text-lg font-semibold mb-2 relative z-10'>Attention Required</h3>
           <p className='text-muted text-sm mb-6 relative z-10'>You have 5 claims that require manual review before the end of the week.</p>
           
           <div className='space-y-3 relative z-10'>
             {[1,2,3].map(i => (
               <div key={i} className='p-3 bg-bg rounded-md border border-border text-sm flex justify-between items-center hover:border-saffron/50 transition-colors cursor-pointer'>
                 <span className='font-medium text-text'>Claim #{8490 + i}</span>
                 <span className='text-rose text-xs font-medium'>Review needed</span>
               </div>
             ))}
           </div>
           
           <Button className='w-full mt-6 relative z-10' variant='outline'>View All Pending</Button>
        </Card>
      </div>
    </div>
  );
}
