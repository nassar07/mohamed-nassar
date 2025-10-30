import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { apiService } from '@/services/api.service';
import { Skill } from '@/types';
import { useToast } from '@/hooks/use-toast';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

export const SkillsSection = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [filter, setFilter] = useState<'all' | 'frontend' | 'backend' | 'tools'>('all');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await apiService.getSkills();
        setSkills(data);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load skills. Please try again later.',
          variant: 'destructive',
        });
        console.error('Failed to fetch skills:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, [toast]);

  const filteredSkills = filter === 'all' 
    ? skills 
    : skills.filter(skill => skill.categoryName?.toLowerCase() === filter);

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 animate-fade-in">
            Skills & Technologies
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg max-w-2xl mx-auto">
            A comprehensive toolkit for building modern, scalable web applications
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['all', 'frontend', 'backend', 'tools'].map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category as any)}
                className={`px-6 py-2 rounded-full font-medium transition-all hover-scale ${
                  filter === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Skills Slider */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading skills...</p>
            </div>
          ) : (
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={24}
              slidesPerView={2}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              speed={1200}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 24,
                },
              }}
              className="skills-swiper pb-12"
            >
              {filteredSkills.map((skill, index) => (
                <SwiperSlide key={skill.id}>
                  <div
                    className="group flex flex-col items-center gap-4 p-6 rounded-xl bg-card hover:bg-accent/50 transition-all hover-scale animate-fade-in border border-border/50"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="w-16 h-16 flex items-center justify-center">
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <span className="text-sm font-medium text-center">{skill.name}</span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </section>
  );
};
