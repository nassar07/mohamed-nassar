import { Card, CardContent } from '@/components/ui/card';
import { Code2, Rocket, Users } from 'lucide-react';

export const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 animate-fade-in">
            About Me
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <div className="animate-slide-in-left">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-glow rounded-2xl blur-2xl opacity-20"></div>
                <img
                  src="https://res.cloudinary.com/dp5rtuv5r/image/upload/v1761676819/My_Photo_p2reef.jpg"
                  alt="Mohamed Nassar"
                  className="relative rounded-2xl shadow-2xl w-full aspect-square object-cover"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-6 animate-slide-in-right">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Hi, I'm <span className="text-primary font-semibold">Mohamed Nassar</span> — a passionate Full Stack .NET Developer who turns ideas into functional, beautiful web experiences.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I love clean code, strong architecture, and continuous learning. My goal is to create digital products that are both efficient and enjoyable to use.
              </p>

              <div className="grid gap-4 pt-4">
                <Card className="hover-glow transition-all">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Code2 className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Clean Code</h3>
                      <p className="text-muted-foreground">Writing maintainable, scalable, and efficient code following best practices</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover-glow transition-all">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Rocket className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Innovation</h3>
                      <p className="text-muted-foreground">Constantly exploring new technologies and methodologies to deliver cutting-edge solutions</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover-glow transition-all">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Collaboration</h3>
                      <p className="text-muted-foreground">Working effectively in teams to deliver high-quality products that exceed expectations</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
