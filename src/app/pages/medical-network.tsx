import { useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../components/ui/dialog";
import { toast } from "sonner";
import {
  Users,
  Search,
  Phone,
  Mail,
  MapPin,
  Award,
  Clock,
  Star,
  Calendar,
  Stethoscope,
  Building2,
  UserCheck,
} from "lucide-react";

const medicalTeam = [
  {
    id: 1,
    name: "李明医生",
    title: "主任医师",
    specialty: "心血管内科",
    experience: "20年",
    rating: 4.9,
    phone: "138-0000-1001",
    email: "liming@medical.com",
    image: "https://raw.githubusercontent.com/suwawww/photo_box/refs/heads/main/4-2.png",
    available: true,
  },
  {
    id: 2,
    name: "陈静医生",
    title: "副主任医师",
    specialty: "儿科",
    experience: "15年",
    rating: 4.8,
    phone: "138-0000-1002",
    email: "chenjing@medical.com",
    image: "https://raw.githubusercontent.com/suwawww/photo_box/refs/heads/main/4-1.png",
    available: true,
  },
  {
    id: 3,
    name: "张伟医生",
    title: "主治医师",
    specialty: "骨科",
    experience: "12年",
    rating: 4.7,
    phone: "138-0000-1003",
    email: "zhangwei@medical.com",
    image: "https://raw.githubusercontent.com/suwawww/photo_box/refs/heads/main/4-3.png",
    available: false,
  },
  {
    id: 4,
    name: "王芳医生",
    title: "主任医师",
    specialty: "妇产科",
    experience: "18年",
    rating: 5.0,
    phone: "138-0000-1004",
    email: "wangfang@medical.com",
    image: "https://raw.githubusercontent.com/suwawww/photo_box/refs/heads/main/4-4.png",
    available: true,
  },
];

const communityStations = [
  {
    id: 1,
    name: "阳光社区卫生服务站",
    address: "阳光小区3栋1楼",
    phone: "0755-8888-0001",
    hours: "08:00 - 20:00",
    services: ["常规检查", "健康咨询", "疫苗接种", "慢病管理"],
  },
  {
    id: 2,
    name: "和谐社区医疗点",
    address: "和谐花园A区",
    phone: "0755-8888-0002",
    hours: "08:30 - 18:00",
    services: ["基础诊疗", "健康体检", "康复理疗"],
  },
  {
    id: 3,
    name: "幸福家园健康中心",
    address: "幸福家园12栋",
    phone: "0755-8888-0003",
    hours: "09:00 - 19:00",
    services: ["全科诊疗", "中医理疗", "心理咨询"],
  },
];

export function MedicalNetworkPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [appointmentDialog, setAppointmentDialog] = useState(false);
  const [contactDialog, setContactDialog] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<typeof medicalTeam[0] | null>(null);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  const filteredDoctors = medicalTeam.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAppointment = (doctor: typeof medicalTeam[0]) => {
    setSelectedDoctor(doctor);
    setAppointmentDialog(true);
  };

  const handleContact = (doctor: typeof medicalTeam[0]) => {
    setSelectedDoctor(doctor);
    setContactDialog(true);
  };

  const confirmAppointment = () => {
    if (appointmentDate && appointmentTime) {
      toast.success(`已成功预约${selectedDoctor?.name}，时间：${appointmentDate} ${appointmentTime}`);
      setAppointmentDialog(false);
      setAppointmentDate("");
      setAppointmentTime("");
    } else {
      toast.error("请选择预约日期和时间");
    }
  };

  const handleCall = () => {
    toast.success(`正在拨打 ${selectedDoctor?.phone}...`);
    setContactDialog(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            社区医疗服务
          </h1>
          <p className="text-muted-foreground mt-1">专业医疗团队为您服务</p>
        </div>
      </div>

      <Tabs defaultValue="doctors" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="doctors">
            <Users className="w-4 h-4 mr-2" />
            医疗团队
          </TabsTrigger>
          <TabsTrigger value="stations">
            <Building2 className="w-4 h-4 mr-2" />
            社区服务站
          </TabsTrigger>
        </TabsList>

        <TabsContent value="doctors" className="space-y-6 mt-6">
          {/* 搜索栏 */}
          <Card className="p-4 border-blue-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="搜索医生或专科..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-input-background"
              />
            </div>
          </Card>

          {/* 医生列表 */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredDoctors.map((doctor) => (
              <Card key={doctor.id} className="p-6 hover:shadow-lg transition-shadow border-blue-100">
                <div className="flex gap-4">
                  <div className="relative">
                    <ImageWithFallback
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-24 h-24 rounded-xl object-cover"
                    />
                    {doctor.available && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                        <UserCheck className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-lg">{doctor.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {doctor.title}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-semibold">
                          {doctor.rating}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Stethoscope className="w-4 h-4 text-blue-600" />
                        <span>{doctor.specialty}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Award className="w-4 h-4" />
                        <span>从业经验 {doctor.experience}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600" onClick={() => handleAppointment(doctor)}>
                        <Calendar className="w-4 h-4 mr-2" />
                        预约
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1" onClick={() => handleContact(doctor)}>
                        <Phone className="w-4 h-4 mr-2" />
                        联系
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="stations" className="space-y-6 mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communityStations.map((station) => (
              <Card key={station.id} className="p-6 hover:shadow-lg transition-shadow border-blue-100">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6 text-white" />
                </div>

                <h3 className="font-bold text-lg mb-4">{station.name}</h3>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-blue-600 mt-0.5" />
                    <span className="text-muted-foreground">{station.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-blue-600" />
                    <span className="text-muted-foreground">{station.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="text-muted-foreground">{station.hours}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">提供服务：</p>
                  <div className="flex flex-wrap gap-2">
                    {station.services.map((service, index) => (
                      <span
                        key={index}
                        className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  查看位置
                </Button>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* 预约对话框 */}
      <Dialog open={appointmentDialog} onOpenChange={setAppointmentDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>预约医生</DialogTitle>
            <DialogDescription>
              请选择预约日期和时间
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="date"
              placeholder="选择日期"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              className="bg-input-background"
            />
            <Input
              type="time"
              placeholder="选择时间"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
              className="bg-input-background"
            />
          </div>
          <div className="mt-4">
            <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600" onClick={confirmAppointment}>
              确认预约
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 联系对话框 */}
      <Dialog open={contactDialog} onOpenChange={setContactDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>联系医生</DialogTitle>
            <DialogDescription>
              正在拨打 {selectedDoctor?.phone}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600" onClick={handleCall}>
              拨打电话
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}