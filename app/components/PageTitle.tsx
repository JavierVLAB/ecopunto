import React from 'react';
import Image from 'next/image';
import arrow_back from '@/public/arrow_left.svg'
import { useRouter } from 'next/navigation';

interface PageTitleProps {
  title: string;
  page: number;
  totalPages: number;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, page, totalPages }) => {
	const router = useRouter()
	const progress = page/totalPages * 100 || 0

	return (
			<div>
				<div className="flex items-center justify-center p-4 ">
					<div className="flex items-center">
					<Image 
							src={arrow_back}
							height={16}
							alt="arrow"
							className=""
							style={{ width: 'auto' }}
							onClick={() => router.back()}
						/>
					</div>
				<h1 className="font_medium text-grey06 flex-grow text-center pe-4">{title}</h1>
				</div>

				{totalPages > 0 ? 
					<>
					{/*<div className="px-4">
					
					<div className=" bg-grey03 rounded-full h-1.5">
						<div className="bg-ecovidrio_dark h-1.5 rounded-full" 
									style={{ width: `${progress}%` }}></div>
						</div>
					</div>*/}

					<div className="px-4 flex space-x-1">
						{Array.from({ length: totalPages }).map((_, index) => (
							<div
							key={index}
							className={`h-1.5 rounded-full flex-1 ${
								index < page ? 'bg-ecovidrio_dark' : 'bg-grey03'
							}`}
							></div>
						))}
					</div>
					</>
				: <></>}


			</div>
	);
};

export default PageTitle;
