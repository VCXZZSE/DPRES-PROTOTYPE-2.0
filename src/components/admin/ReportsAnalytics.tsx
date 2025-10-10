// import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Download,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, LineChart, Line, Legend, PieChart, Pie, Cell } from 'recharts';
import { allInstitutions, schools, colleges } from '../shared/institutionsData';

export function ReportsAnalytics() {
  const exportReport = (format: string) => {
    console.log(`Exporting report in ${format} format`);
  };

  // Performance data based on real institutions
  const performanceData = (() => {
    const districtStats = new Map();
    
    allInstitutions.forEach(inst => {
      if (!districtStats.has(inst.district)) {
        districtStats.set(inst.district, {
          district: inst.district,
          schools: 0,
          colleges: 0,
          totalProgress: 0,
          count: 0
        });
      }
      
      const stats = districtStats.get(inst.district);
      if (inst.type === 'school') {
        stats.schools++;
      } else {
        stats.colleges++;
      }
      stats.totalProgress += inst.avgProgress;
      stats.count++;
    });
    
    return Array.from(districtStats.values()).map(stats => ({
      district: stats.district,
      schools: stats.schools,
      colleges: stats.colleges,
      completion: Math.round(stats.totalProgress / stats.count)
    }));
  })();

  const monthlyProgress = [
    { month: 'Jan', completed: 65, enrolled: 80 },
    { month: 'Feb', completed: 72, enrolled: 85 },
    { month: 'Mar', completed: 78, enrolled: 88 },
    { month: 'Apr', completed: 82, enrolled: 90 },
    { month: 'May', completed: 86, enrolled: 92 },
    { month: 'Jun', completed: 89, enrolled: 95 }
  ];

  const institutionTypes = [
    { name: 'Schools', value: schools.length, color: '#2563eb' },
    { name: 'Colleges', value: colleges.length, color: '#f97316' }
  ];

  const topPerformers = allInstitutions
    .sort((a, b) => b.avgProgress - a.avgProgress)
    .slice(0, 5)
    .map(inst => ({
      name: inst.name,
      completion: inst.avgProgress,
      students: inst.students
    }));

  const lowPerformers = allInstitutions
    .sort((a, b) => a.avgProgress - b.avgProgress)
    .slice(0, 4)
    .map(inst => ({
      name: inst.name,
      completion: inst.avgProgress,
      students: inst.students
    }));

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl lg:text-2xl font-bold">Reports & Analytics</h2>
          <p className="text-sm text-muted-foreground">Comprehensive insights and performance metrics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => exportReport('csv')}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="outline" size="sm" onClick={() => exportReport('pdf')}>
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* District Performance */}
        <Card>
          <CardHeader>
            <CardTitle>District Performance</CardTitle>
            <CardDescription>Training completion rates by district</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="district" 
                    fontSize={12}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="completion" fill="#2563eb" name="Completion %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Progress Trend</CardTitle>
            <CardDescription>Training completion over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyProgress}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="completed" stroke="#2563eb" name="Completed" strokeWidth={2} />
                  <Line type="monotone" dataKey="enrolled" stroke="#f97316" name="Enrolled" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Institution Types Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Institution Distribution</CardTitle>
            <CardDescription>Schools vs Colleges enrollment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={institutionTypes}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {institutionTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Performance Rankings */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Rankings</CardTitle>
            <CardDescription>Top and low performers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
                Top Performers
              </h4>
              {topPerformers.slice(0, 3).map((performer, index) => (
                <div key={index} className="flex justify-between items-center py-2">
                  <div>
                    <p className="text-sm font-medium truncate max-w-40">{performer.name}</p>
                    <p className="text-xs text-gray-600">{performer.students.toLocaleString()} students</p>
                  </div>
                  <Badge className="bg-green-100 text-green-700">{performer.completion}%</Badge>
                </div>
              ))}
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2 flex items-center">
                <TrendingDown className="h-4 w-4 mr-1 text-red-500" />
                Need Improvement
              </h4>
              {lowPerformers.slice(0, 3).map((performer, index) => (
                <div key={index} className="flex justify-between items-center py-2">
                  <div>
                    <p className="text-sm font-medium truncate max-w-40">{performer.name}</p>
                    <p className="text-xs text-gray-600">{performer.students.toLocaleString()} students</p>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-700">{performer.completion}%</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}