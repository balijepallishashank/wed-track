"use client"

import { WebsiteType } from '@/app/api/website/route';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { ArrowLeft, Copy, Trash, Loader2 } from 'lucide-react'; // Added Loader2 for spinner
import { useParams, useRouter } from 'next/navigation'; // Correct import for App Router
import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator'; // Check this path (shadcn usually puts it here)
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from 'next/link';

// 👇 FIX: Import SyntaxHighlighter correctly
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

function WebsiteSettings() {
    const { websiteId } = useParams();
    const router = useRouter();
    
    // 👇 FIX: Rename state variable to camelCase to avoid conflict with Type/Component names
    const [websiteDetail, setWebsiteDetail] = useState<WebsiteType>();
    const [websiteDomain, setWebsiteDomain] = useState<string>('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (websiteId) {
            GetWebsiteDetail();
        }
    }, [websiteId]);

    const GetWebsiteDetail = async () => {
        try {
            const result = await axios.get('/api/website?websiteId=' + websiteId + "&websiteOnly=true");
            setWebsiteDetail(result?.data);
            setWebsiteDomain(result?.data?.domain || '');
        } catch (error) {
            console.error("Error fetching details:", error);
            toast.error("Failed to fetch website details");
        }
    }

    // Define the script code here
    const scriptCode = `<script
    defer
    data-website-id='${websiteId}'
    data-domain='${websiteDetail?.domain}'
    src="${process.env.NEXT_PUBLIC_HOST_URL}/analytics.js">
</script>`;

    const onCopy = () => {
        navigator.clipboard.writeText(scriptCode);
        toast.success('Script copied to clipboard');
    }

    // 👇 FIX: Correct async function syntax
    const onDelectwebsite = async () => {
        setLoading(true);
        try {
            await axios.delete('/api/website', {
                data: {
                    websiteId: websiteId
                }
            });
            toast.success('Website Deleted');
            router.replace('/dashboard');
        } catch (error) {
            console.error(error);
            toast.error("Error deleting website");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <div className='w-full mt-10 mb-20'>
                <Link href={"/dashboard/" + websiteId}>
                    <Button className='w-20'><ArrowLeft /> Back </Button>
                </Link>
                <h2 className='text-2xl font-bold mt-3'>Settings for {websiteDetail?.domain?.replace('http://', '')}</h2>
            </div>

            <Tabs defaultValue="General" className="w-[600px] mt-6">
                <TabsList>
                    <TabsTrigger value="General">General</TabsTrigger>
                    <TabsTrigger value="Other">Other</TabsTrigger>
                </TabsList>

                {/* GENERAL TAB */}
                <TabsContent value="General">
                    <Card>
                        <CardHeader>
                            <CardTitle>Script</CardTitle>
                        </CardHeader>
                        <Separator />
                        <CardContent>
                            <p className='mt-3'> Copy and paste the code in your project</p>
                            <div className="relative mt-5">
                                {/* 👇 FIX: Use correct syntax highlighter props */}
                                <SyntaxHighlighter
                                    language="javascript"
                                    style={atomDark}
                                    customStyle={{
                                        borderRadius: "8px",
                                        padding: "16px",
                                        fontSize: "13px",
                                    }}
                                >
                                    {scriptCode}
                                </SyntaxHighlighter>

                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={onCopy}
                                    className="absolute top-2 right-2"
                                >
                                    <Copy size={16} />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className='mt-6'>
                        <CardHeader>
                            <CardTitle>Domain</CardTitle>
                            <CardDescription>Your main website domain for analytics Tracking</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {/* 👇 FIX: Value should be the variable, not the setter function */}
                            <Input 
                                placeholder='website.com' 
                                value={websiteDomain}
                                onChange={(e) => setWebsiteDomain(e.target.value)} 
                            />
                            <div className='mt-4'>
                                <h2 className='flex justify-between m-2 text-sm text-gray-500'>
                                    Your public WEBTRACK Id: {websiteId}
                                </h2>
                                <Button onClick={() => toast.info("Save logic not implemented yet")}>Save</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* OTHER TAB */}
                <TabsContent value="Other">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-red-500">Danger Zone</CardTitle>
                        </CardHeader>
                        <Separator />
                        <CardContent className='flex justify-between items-center mt-3'>
                            <h2>Do you want to delete this website from webtrack?</h2>
                            
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button className='text-white' variant={'destructive'}> <Trash className="mr-2 h-4 w-4"/> Delete </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete your project
                                            and remove your data from our servers.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        {/* 👇 FIX: Use onClick, not onDoubleClick for better UX */}
                                        <Button 
                                            className='text-white'
                                            onClick={onDelectwebsite}
                                            disabled={loading}
                                            variant={'destructive'}
                                        >
                                            {loading ? <Loader2 className='animate-spin h-4 w-4'/> : 'Continue to Delete'}
                                        </Button>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>

                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default WebsiteSettings