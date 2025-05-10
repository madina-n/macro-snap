"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { FoodFormData, FoodItem } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import React, { useEffect } from "react";

const foodFormSchema = z.object({
  name: z.string().min(1, { message: "Food name is required." }),
  calories: z.string().regex(/^\d+(\.\d+)?$/, { message: "Must be a valid number."}).transform(Number).refine(val => val >= 0, { message: "Cannot be negative."}),
  protein: z.string().regex(/^\d+(\.\d+)?$/, { message: "Must be a valid number."}).transform(Number).refine(val => val >= 0, { message: "Cannot be negative."}),
  carbs: z.string().regex(/^\d+(\.\d+)?$/, { message: "Must be a valid number."}).transform(Number).refine(val => val >= 0, { message: "Cannot be negative."}),
  fat: z.string().regex(/^\d+(\.\d+)?$/, { message: "Must be a valid number."}).transform(Number).refine(val => val >= 0, { message: "Cannot be negative."}),
});

interface FoodLogFormProps {
  onAddFood: (food: Omit<FoodItem, 'id' | 'timestamp'>) => void;
  initialValues?: Partial<FoodFormData>; // For pre-filling from AI suggestions
}

const FoodLogForm: React.FC<FoodLogFormProps> = ({ onAddFood, initialValues }) => {
  const form = useForm<z.infer<typeof foodFormSchema>>({
    resolver: zodResolver(foodFormSchema),
    defaultValues: {
      name: initialValues?.name || "",
      calories: initialValues?.calories || "",
      protein: initialValues?.protein || "",
      carbs: initialValues?.carbs || "",
      fat: initialValues?.fat || "",
    },
  });

  useEffect(() => {
    if (initialValues) {
      form.reset({
        name: initialValues.name || "",
        calories: initialValues.calories || "",
        protein: initialValues.protein || "",
        carbs: initialValues.carbs || "",
        fat: initialValues.fat || "",
      });
    }
  }, [initialValues, form]);


  function onSubmit(values: z.infer<typeof foodFormSchema>) {
    onAddFood(values as Omit<FoodItem, 'id' | 'timestamp'>); // Zod transform handles string to number
    form.reset({ name: "", calories: "", protein: "", carbs: "", fat: "" }); // Reset form after submission
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <PlusCircle className="mr-2 h-6 w-6 text-primary" /> Log Food Item
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Food Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Chicken Breast" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="calories"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Calories (kcal)</FormLabel>
                    <FormControl>
                      <Input type="text" inputMode="decimal" placeholder="e.g., 165" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="protein"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Protein (g)</FormLabel>
                    <FormControl>
                      <Input type="text" inputMode="decimal" placeholder="e.g., 31" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="carbs"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Carbs (g)</FormLabel>
                    <FormControl>
                      <Input type="text" inputMode="decimal" placeholder="e.g., 0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fat (g)</FormLabel>
                    <FormControl>
                      <Input type="text" inputMode="decimal" placeholder="e.g., 3.6" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
              <PlusCircle className="mr-2 h-4 w-4" /> Add to Log
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default FoodLogForm;
